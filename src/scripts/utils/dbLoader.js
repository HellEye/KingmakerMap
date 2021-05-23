import Settings from "../settings/Settings"
import Toast from "../../components/util/Toast"

const addr = `http://${Settings.address}:${Settings.dbPort}/api/`

function makeRequest(url, method, data = null) {
	return fetch(addr + url, {
		method: method,
		body: data,
	})
		.then(response => {
			if (!response.ok)
				if (response.body) {
					console.error(`ERROR with ${method} at ${addr + url}`)
					const error = new Error("Something happened :(")
					if (response.body)
						error.data = response
					throw error
				} else {
					const error = new Error("Something happened :(")
					error.data = "No body to be found"
					throw error
				}
			return response.json()
		})
		.catch(err => {
			if (err instanceof SyntaxError) {
				console.error(`Json parse error from ${method} at ${addr + url}`)
				Toast.push("Json parse error, this really shouldn't happen", 10, "warn")
				return []
			} else {
				return []
			}
		})
}

export default makeRequest;