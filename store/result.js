const GET_RESULTS = 'GET_RESULTS';

let result = [];

const getResult = result => {
  const action = { type: GET_RESULTS, result };
  return action;
}

export const getResultThunk = searchItem => dispatch => {
  console.log('i am searching for ', searchItem)
}

export default (state = result, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return action.result

    default:
      return state;
  }
}