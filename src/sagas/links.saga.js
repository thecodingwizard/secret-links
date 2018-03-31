import { call, put, takeLatest } from "redux-saga/effects";
import * as linksService from "../services/links.service";
import * as linksActions from "../actions/links.actions";

function* fetchLink(action) {
	try {
		const link = yield call(linksService.fetchLink, action.accessUrl, action.password);
		yield put({ type: "GET_LINK_SUCCESS", link });
	} catch (e) {
		yield put({ type: "GET_LINK_FAIL", message: e.message });
	}
}

function* linksSaga() {
	yield takeLatest(linksActions.GET_LINK, fetchLink);
}

export default linksSaga;