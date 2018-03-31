import "whatwg-fetch";
import * as CryptoJS from "crypto-js";

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
	const { link, accessUrl, name, description } = data;
	const linkObj = {
		link, accessUrl, name, description
	};
	let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(linkObj), data.password);

	return fetch(`${SERVER}/links`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			data: encryptedData.toString(),
			accessUrl: data.accessUrl
		})
	}).then(response => response.json());
}