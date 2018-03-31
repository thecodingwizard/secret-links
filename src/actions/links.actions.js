export const GET_LINK = "[Links] Get Link";

export function getLink(accessUrl, password) {
	return { type: GET_LINK, accessUrl, password };
}