export const GET_LINK = "[Links] Get Link";
export const GET_LINK_SUCCESS = "[Links] Get Link Success";
export const GET_LINK_FAIL = "[Links] Get Link Fail";

export function getLink(accessUrl, password) {
	return { type: GET_LINK, accessUrl, password };
}
export function getLinkSuccess(link) {
	return { type: GET_LINK_SUCCESS, link };
}
export function getLinkFail(message) {
	return { type: GET_LINK_FAIL, message };
}

export const CREATE_NEW_LINK = "[Links] Create New Link";
export const CREATE_NEW_LINK_SUCCESS = "[Links] Create New Link Success";
export const CREATE_NEW_LINK_FAIL = "[Links] Create New Link Fail";

export function createNewLink(data) {
	return { type: CREATE_NEW_LINK, data };
}
export function createNewLinkSuccess(accessUrl) {
	return { type: CREATE_NEW_LINK_SUCCESS, accessUrl };
}
export function createNewLinkFail(message) {
	return { type: CREATE_NEW_LINK_FAIL, message };
}

export const RESET_LINK = "[Links] Reset Link";

export function resetLink() {
	return { type: RESET_LINK };
}