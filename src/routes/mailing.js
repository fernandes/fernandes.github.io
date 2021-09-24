import { telegramNotify } from '$lib/utils.js'

export async function post(request) {
	const { mailing } = request.body

	telegramNotify(`[coding] 📥 New Sign Up ${mailing.firstName} ${mailing.lastName} (${mailing.email})`)

	return {
		headers: {
		},
		body: { message: "Signed To Mailing" }
	};
}
