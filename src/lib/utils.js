export function post(endpoint, data) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

export function telegramNotify(message) {
	const apiKey = import.meta.env.VITE_TELEGRAM_KEY;
	const chatID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

	console.log('apikey', apiKey);
	console.log('chatID', chatID);

	return fetch(`https://api.telegram.org/${apiKey}/sendMessage?chat_id=${chatID}&text=${encodeURIComponent(message)}`)	
}
