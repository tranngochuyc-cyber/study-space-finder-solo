export const STORAGE_KEY = 'studyspace:favorites:v1';

export function createFavorites(onWarning, getStorage = () => window.localStorage) {
  let ids = new Set();
  function read() {
    try {
      const raw = getStorage().getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed) || !parsed.every(id => typeof id === 'string')) throw new Error('Invalid favorites');
      ids = new Set(parsed);
    } catch {
      onWarning('Không đọc được dữ liệu đã lưu. Bạn vẫn có thể lưu tạm trong phiên này.');
    }
    return ids;
  }
  read();
  return {
    get ids() { return new Set(ids); },
    reload: read,
    toggle(id) {
      ids.has(id) ? ids.delete(id) : ids.add(id);
      try { getStorage().setItem(STORAGE_KEY, JSON.stringify([...ids])); }
      catch { onWarning('Trình duyệt không cho phép lưu lâu dài. Yêu thích chỉ được giữ trong phiên này.'); }
      return ids.has(id);
    }
  };
}
