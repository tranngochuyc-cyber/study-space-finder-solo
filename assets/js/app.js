import { selectSpaces } from './search.js';
import { createFavorites, STORAGE_KEY } from './features/favorites.js';
import { cardHTML, detailHTML, types, amenities, quiet, escapeHTML } from './components/space-cards.js';

const $ = selector => document.querySelector(selector);
const defaults = () => ({ query: '', district: '', type: '', price: '', quiet: '', amenities: [], savedOnly: location.hash === '#favorites', sort: 'name' });
let state = defaults();
let spaces = [];
let activeSpace = null;
let returnFocus = null;
let noticeTimer;
let loaded = false;
const dialog = $('#detail');
function notify(message) {
  clearTimeout(noticeTimer);
  $('#notice').textContent = message;
  $('#notice').hidden = false;
  noticeTimer = setTimeout(() => { $('#notice').hidden = true; }, 6500);
}
const favorites = createFavorites(notify);

function syncControls() {
  for (const key of ['query', 'district', 'price', 'quiet', 'sort']) $(`#${key}`).value = state[key];
  $('#saved-only').checked = state.savedOnly;
  document.querySelectorAll('[name="amenity"]').forEach(input => { input.checked = state.amenities.includes(input.value); });
  document.querySelectorAll('[data-type]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.type === state.type)));
}

function render() {
  $('#saved-count').textContent = spaces.filter(space => favorites.ids.has(space.id)).length;
  $('#results-title').textContent = state.savedOnly ? 'Những góc học bạn đã lưu' : 'Không gian dành cho bạn';
  for (const [selector, current] of [['#favorites-link', state.savedOnly], ['#explore-link', !state.savedOnly]]) {
    if (current) $(selector).setAttribute('aria-current', 'page');
    else $(selector).removeAttribute('aria-current');
  }
  const selected = selectSpaces(spaces, state, favorites.ids);
  $('#result-count').innerHTML = `<strong>${selected.length}</strong> không gian phù hợp`;
  $('#cards').innerHTML = selected.length ? selected.map(space => cardHTML(space, favorites.ids.has(space.id))).join('') : `<div class="state"><span aria-hidden="true">⌕</span><h3>${state.savedOnly ? 'Chưa có góc học phù hợp đã lưu' : 'Chưa tìm thấy góc học phù hợp'}</h3><p>${state.savedOnly ? 'Nhấn trái tim trên địa điểm bạn thích, hoặc thay đổi bộ lọc.' : 'Thử một từ khóa khác hoặc bớt điều kiện lọc nhé.'}</p><button class="primary" data-reset>Khám phá tất cả không gian</button></div>`;
  const labels = { query: `Tìm: ${state.query}`, district: state.district, type: types[state.type], price: $('#price').selectedOptions[0]?.textContent, quiet: quiet[state.quiet], savedOnly: 'Chỉ xem đã lưu' };
  $('#chips').innerHTML = Object.entries(labels).filter(([key]) => state[key]).map(([key, label]) => `<button class="chip" data-remove="${key}" aria-label="Xóa bộ lọc ${escapeHTML(label)}">${escapeHTML(label)} ×</button>`).join('') + state.amenities.map(key => `<button class="chip" data-amenity-remove="${key}" aria-label="Xóa bộ lọc ${amenities[key]}">${amenities[key]} ×</button>`).join('');
}

function reset() {
  state = { ...defaults(), savedOnly: false };
  if (location.hash !== '#explore') history.pushState(null, '', '#explore');
  syncControls(); render();
}

function openDetail(id) {
  const space = spaces.find(item => item.id === id);
  if (!space) { notify('Không tìm thấy địa điểm này. Vui lòng chọn trong danh sách.'); return; }
  activeSpace = space;
  returnFocus = document.activeElement;
  $('#detail-body').innerHTML = detailHTML(space, favorites.ids.has(id));
  dialog.showModal();
  $('#close-detail').focus();
}
function updateFavorite(id) {
  favorites.toggle(id);
  const focused = document.activeElement;
  const wasCard = focused?.matches('.card [data-favorite]');
  render();
  if (activeSpace) {
    const button = $('#detail-body [data-favorite]');
    const saved = favorites.ids.has(activeSpace.id);
    button.setAttribute('aria-pressed', String(saved));
    button.textContent = saved ? '♥ Đã lưu — Bỏ lưu địa điểm' : '♡ Lưu địa điểm';
  }
  if (wasCard) ($(`[data-favorite="${id}"]`) || $('[data-reset]') || $('#saved-only')).focus();
}

$('#query').addEventListener('input', event => { state.query = event.target.value; if (loaded) render(); });
$('#search-button').addEventListener('click', () => { $('#results').scrollIntoView(); $('#results').focus({ preventScroll: true }); });
$('#filters-form').addEventListener('submit', event => event.preventDefault());
$('#filters-form').addEventListener('change', () => {
  for (const key of ['district', 'price', 'quiet']) state[key] = $(`#${key}`).value;
  state.amenities = [...document.querySelectorAll('[name="amenity"]:checked')].map(input => input.value);
  state.savedOnly = $('#saved-only').checked;
  history.replaceState(null, '', state.savedOnly ? '#favorites' : '#explore');
  if (loaded) render();
});
$('#sort').addEventListener('change', event => { state.sort = event.target.value; if (loaded) render(); });
$('#clear').addEventListener('click', reset);
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if ('type' in button.dataset) { state.type = button.dataset.type; syncControls(); if (loaded) render(); }
  if (button.dataset.detail) openDetail(button.dataset.detail);
  if (button.dataset.favorite) updateFavorite(button.dataset.favorite);
  if ('reset' in button.dataset) reset();
  if ('retry' in button.dataset) loadSpaces();
  if (button.dataset.remove) {
    const key = button.dataset.remove;
    state[key] = key === 'savedOnly' ? false : '';
    if (key === 'savedOnly') history.replaceState(null, '', '#explore');
    syncControls(); render(); $('#clear').focus();
  }
  if (button.dataset.amenityRemove) { state.amenities = state.amenities.filter(item => item !== button.dataset.amenityRemove); syncControls(); render(); $('#clear').focus(); }
});
$('#close-detail').addEventListener('click', () => dialog.close());
// Giữ Tab trong hộp thoại, kể cả khi trình duyệt muốn chuyển lên thanh địa chỉ.
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('button:not([disabled]), a[href], input, select, [tabindex="0"]')];
  const first = controls[0];
  const last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => {
  const id = activeSpace?.id;
  activeSpace = null;
  (returnFocus?.isConnected ? returnFocus : $(`[data-detail="${id}"]`) || $('#results')).focus({ preventScroll: true });
});
window.addEventListener('hashchange', () => { state.savedOnly = location.hash === '#favorites'; syncControls(); if (loaded) render(); });
window.addEventListener('storage', event => { if (event.key === STORAGE_KEY || event.key === null) { favorites.reload(); if (loaded) render(); if (activeSpace) { const button = $('#detail-body [data-favorite]'); const saved = favorites.ids.has(activeSpace.id); button.setAttribute('aria-pressed', String(saved)); button.textContent = saved ? '♥ Đã lưu — Bỏ lưu địa điểm' : '♡ Lưu địa điểm'; } } });

export function validateSpaces(data) {
  if (!Array.isArray(data)) throw new Error('Dữ liệu không phải danh sách');
  const ids = new Set();
  for (const item of data) {
    if (!item || typeof item.id !== 'string' || !/^[a-z0-9-]+$/.test(item.id) || ids.has(item.id)
      || !['name', 'district', 'address', 'description', 'hours', 'unit'].every(key => typeof item[key] === 'string' && item[key].trim())
      || !Object.hasOwn(types, item.type) || ![1, 2, 3].includes(item.quiet)
      || !Number.isFinite(item.price) || item.price < 0 || !Array.isArray(item.amenities)
      || !item.amenities.every(key => Object.hasOwn(amenities, key))) throw new Error('Dữ liệu địa điểm không hợp lệ');
    ids.add(item.id);
  }
  return data;
}
async function loadSpaces() {
  loaded = false;
  $('#cards').setAttribute('aria-busy', 'true');
  $('#cards').innerHTML = '<p class="state">Đang tải địa điểm…</p>';
  $('#result-count').textContent = 'Đang tải địa điểm…';
  $('#filters-form').inert = true;
  $('#clear').disabled = true;
  try {
    const response = await fetch(new URL('../../data/spaces.json', import.meta.url));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    spaces = validateSpaces(await response.json());
    const districts = [...new Set(spaces.map(space => space.district))].sort((a, b) => a.localeCompare(b, 'vi'));
    $('#district').innerHTML = '<option value="">Tất cả khu vực</option>' + districts.map(value => `<option>${escapeHTML(value)}</option>`).join('');
    loaded = true; syncControls(); render();
  } catch (error) {
    $('#result-count').textContent = 'Chưa tải được dữ liệu';
    $('#cards').innerHTML = '<div class="state"><h3>Kết nối bị gián đoạn</h3><p>Không tải được danh sách. Hãy kiểm tra kết nối và chạy website bằng HTTP server.</p><button class="primary" data-retry>Thử lại</button></div>';
    console.warn('Không thể tải spaces.json:', error.message);
  } finally {
    $('#cards').setAttribute('aria-busy', 'false');
    $('#filters-form').inert = !loaded;
    $('#clear').disabled = !loaded;
  }
}
syncControls();
loadSpaces();
