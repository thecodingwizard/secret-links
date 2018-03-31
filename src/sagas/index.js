import { all } from "redux-saga/effects";
import linksSaga from "./links.saga";

export default function* rootSaga() {
	yield all([
		linksSaga
	])
}