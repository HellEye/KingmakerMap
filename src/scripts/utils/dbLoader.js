import Settings from "../settings/Settings"

const addr = `http://${Settings.address}:${Settings.dbPort}/api/`

function makeRequest(url, method, data = null) {
	return fetch(addr + url, {
		method: method,
		body: data
	})
		.then(response => {
			if (!response.ok)
				if (response.body)
					return response.json().then(result => {
						console.error("ERROR with fetch")
						const error = new Error("Something happened :(")
						if (response.body)
							error.data = result
						throw error
					})
				else {
					const error = new Error("Something happened :(")
					error.data="No body to be found"
					throw error
				}
			return response.json()
		}).then(json=>{
			return json
		})
		.catch(err => {
			console.log(err)
			console.log(err.data)
			return {}
		})
}

export default makeRequest;