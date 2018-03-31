import "whatwg-fetch";

const SERVER = "https://secretlinksapi.pandadevgroup.com";

export function fetchLink(accessUrl, password) {
	return fetch(`${SERVER}/links/${accessUrl}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ password })
	}).then(response => response.json());
}

export function createNewLink(data) {
	let encryptedData = "hi";

	return fetch(`${SERVER}/links`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			data: encryptedData,
			accessUrl: data.accessUrl
		})
	}).then(response => response.json());
}