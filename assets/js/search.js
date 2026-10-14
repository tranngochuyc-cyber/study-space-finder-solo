// Hàm thuần: không truy cập DOM, có thể kiểm thử độc lập.
export function normalize(text) {
  return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
}

export function selectSpaces(spaces, state, favorites) {
  const query = normalize(state.query);
  const selected = spaces.filter(space => {
    const priceMatches = !state.price || (state.price === 'free' && space.price === 0)
      || (state.price === 'low' && space.price <= 50000)
      || (state.price === 'mid' && space.price > 50000 && space.price <= 100000)
      || (state.price === 'high' && space.price > 100000);
    return normalize(`${space.name} ${space.address} ${space.district}`).includes(query)
      && (!state.type || space.type === state.type)
      && (!state.district || space.district === state.district)
      && priceMatches
      && (!state.quiet || space.quiet === Number(state.quiet))
      && state.amenities.every(amenity => space.amenities.includes(amenity))
      && (!state.savedOnly || favorites.has(space.id));
  });
  return selected.sort((a, b) => {
    const byName = a.name.localeCompare(b.name, 'vi');
    if (state.sort === 'price-asc') return a.price - b.price || byName;
    if (state.sort === 'price-desc') return b.price - a.price || byName;
    return byName;
  });
}
