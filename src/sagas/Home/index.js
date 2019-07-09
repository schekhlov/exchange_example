import { all } from 'redux-saga/effects';
import { watchInit } from './Init';
import { watchUpdate } from './Update';
import { watchExchange } from './Exchange';
import { watchChangePrimaryPocket } from './ChangePrimaryPocket';
import { watchChangeSecondaryPocket } from './ChangeSecondaryPocket';
import { watchChangePrimaryPocketValue } from './ChangePrimaryPocketValue';
import { watchChangeSecondaryPocketValue } from './ChangeSecondaryPocketValue';

export default function* Home() {
  yield all([
    watchInit(),
    watchUpdate(),
    watchExchange(),
    watchChangePrimaryPocket(),
    watchChangeSecondaryPocket(),
    watchChangePrimaryPocketValue(),
    watchChangeSecondaryPocketValue()
  ]);
}
