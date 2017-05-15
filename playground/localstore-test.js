fetch(`https://cors.now.sh/https://api.walmartlabs.com/v1/search?apiKey=${key}&query=jeans&format=json`).then(response => response.json()).then(result => localStorage.setItem("strr", JSON.stringify(result.items)));


JSON.parse(localStorage.getItem("strr"))