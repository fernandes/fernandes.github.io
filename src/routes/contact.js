import { telegramNotify } from '$lib/utils.js'

export async function post(request) {
	const { contact } = request.body

	telegramNotify(`[coding] 📬 New Message
From: ${contact.firstName} ${contact.lastName} (${contact.email})
Message: ${contact.message}
`)

	return {
		headers: {
		},
		body: { message: "Message Sent" }
	};
}
