export const GET_LINK = "[Links] Get Link";

export function getLink(accessUrl) {
	return { type: GET_LINK, accessUrl };
}