import { call, put, takeLatest } from "redux-saga/effects";
import * as linksService from "../services/links.service";

function* fetchLink(action) {
	try {
		const link = yield call(linksService.fetchLink, action.payload.accessUrl);
		yield put({ type: "GET_LINK_SUCCESS", link });
	} catch (e) {
		yield put({ type: "GET_LINK_FAIL", message: e.message });
	}
}

function* linksSaga() {
	yield takeLatest("GET_LINK", fetchLink);
}

export default linksSaga;