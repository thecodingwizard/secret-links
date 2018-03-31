import { all, fork } from "redux-saga/effects";
import linksSaga from "./links.saga";

export default function* rootSaga() {
	yield all([
		fork(linksSaga)
	]);
}