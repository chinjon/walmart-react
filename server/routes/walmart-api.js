const axios = require('axios');
const hide = require('./hide');

const key = hide.KEY;

function getItems(searchItem, brand, results, startAt, sort) {
    const url = 'https://api.walmartlabs.com/v1/search?'
    var searchItem = searchItem
    axios
        .get(`${url}apiKey=${hide.KEY}&&query=apple&format=json`)
        .then(response => {
            let data = response.data;
            let items = data.items
            items.map(e => {
                console.log(e.name)
                console.log(" ")
            })
        })
}

getItems()