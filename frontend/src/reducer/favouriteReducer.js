export function favouriteReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      const exists = state.find(p => p.id === action.payload.id);

      if (exists) {
        return state.filter(p => p.id !== action.payload.id);
      }

      return [...state, action.payload];

    default:
      return state;
  }
}