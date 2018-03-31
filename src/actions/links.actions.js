export const GET_LINK = "[Links] Get Link";
export const CREATE_NEW_LINK = "[Links] Create New Link";

export function getLink(accessUrl, password) {
	return { type: GET_LINK, accessUrl, password };
}

export function createNewLink(data) {
	return { type: CREATE_NEW_LINK, data };
}