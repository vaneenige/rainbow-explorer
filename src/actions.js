export const addColor = color => ({
  type: 'ADD_COLOR',
  color,
});

export const removeColor = color => ({
  type: 'REMOVE_COLOR',
  color,
});

export const currentColor = color => ({
  type: 'CURRENT_COLOR',
  color,
});

export const setCollection = toggleState => ({
  type: 'SET_COLLECTION',
  toggleState,
});
