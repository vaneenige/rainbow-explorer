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

export const setFacingMode = toggleState => ({
  type: 'SET_FACING_MODE',
  toggleState,
});

export const setMultipleVideoSources = toggleState => ({
  type: 'SET_MULTIPLE_VIDEO_SOURCES',
  toggleState,
});
