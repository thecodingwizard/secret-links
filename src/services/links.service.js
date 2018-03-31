import "whatwg-fetch";

const SERVER = "https://secretlinksapi.pandadevgroup.com";

export function fetchLink(accessUrl, password = "testing") {
	return fetch(`${SERVER}/links/${accessUrl}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ password })
	}).then(response => response.json()).then(response => {
		console.log(response);
	});
}