export const initialState = {
  list: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, list: [], waiting: true};

    case "comments/add-new-start":
      return {...state, waiting: true};

    case "comments/load-success":
      return {...state, list: action.payload.list, waiting: false};

    case "comments/load-error":
      return {...state, list: [], waiting: false};

    default:
      return state;
  }
}

export default reducer;
