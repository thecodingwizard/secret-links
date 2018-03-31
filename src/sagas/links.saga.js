import { call, put, takeLatest, all } from "redux-saga/effects";
import * as linksService from "../services/links.service";
import * as linksActions from "../actions/links.actions";

function* fetchLink(action) {
	try {
		const link = yield call(linksService.fetchLink, action.accessUrl, action.password);
		if (link.message) {
			// Message is an error message
			throw link;
		}
		yield put(linksActions.getLinkSuccess(link));
	} catch (e) {
		yield put(linksActions.getLinkFail(e.message));
	}
}

function* createNewLink(action) {
	try {
		const response = yield call(linksService.createNewLink, action.data);
		if (response.message !== "OK") throw response;
		yield put(linksActions.createNewLinkSuccess(action.data.accessUrl));
	} catch (e) {
		yield put(linksActions.createNewLinkFail(e.message));
	}
}

function* linksSaga() {
	yield all([
		takeLatest(linksActions.GET_LINK, fetchLink),
		takeLatest(linksActions.CREATE_NEW_LINK, createNewLink)
	]);
}

export default linksSaga;