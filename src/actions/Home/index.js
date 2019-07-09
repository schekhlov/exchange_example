export const INIT_REQUEST = 'exchange/home/INIT_REQUEST';
export const UPDATE_REQUEST = 'exchange/home/UPDATE_REQUEST';
export const EXCHANGE_REQUEST = 'exchange/home/EXCHANGE_REQUEST';
export const CHANGE_PRIMARY_POCKET_REQUEST = 'exchange/home/CHANGE_PRIMARY_POCKET_REQUEST';
export const CHANGE_SECONDARY_POCKET_REQUEST = 'exchange/home/CHANGE_SECONDARY_POCKET_REQUEST';
export const CHANGE_PRIMARY_POCKET_VALUE_REQUEST = 'exchange/home/CHANGE_PRIMARY_POCKET_VALUE_REQUEST';
export const CHANGE_SECONDARY_POCKET_VALUE_REQUEST = 'exchange/home/CHANGE_SECONDARY_POCKET_VALUE_REQUEST';

export function initRequest() {
  return { type: INIT_REQUEST };
}

export function updateRequest() {
  return { type: UPDATE_REQUEST };
}

export function exchangeRequest() {
  return { type: EXCHANGE_REQUEST };
}

export function changePrimaryPocketRequest(id) {
  return { type: CHANGE_PRIMARY_POCKET_REQUEST, id };
}

export function changeSecondaryPocketRequest(id) {
  return { type: CHANGE_SECONDARY_POCKET_REQUEST, id };
}

export function changePrimaryPocketValueRequest(value) {
  return { type: CHANGE_PRIMARY_POCKET_VALUE_REQUEST, value };
}

export function changeSecondaryPocketValueRequest(value) {
  return { type: CHANGE_SECONDARY_POCKET_VALUE_REQUEST, value };
}
