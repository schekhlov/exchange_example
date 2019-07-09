export const SET_EXCHANGE = 'exchange/exchange/SET_EXCHANGE';

const initialState = {
  pockets: null,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_EXCHANGE:
      return {
        ...state,
        ...action.exchange
      };
    default:
      return state;
  }
}

export function setExchange(exchange) {
  return { type: SET_EXCHANGE, exchange };
}
