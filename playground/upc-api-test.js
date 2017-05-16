const fetch = require('node-fetch')

const itemUPC = '039304243905'
const url = `https://cors.now.sh/https://api.upcitemdb.com/prod/trial/lookup?upc=${itemUPC}`

var stored = ""

function findUPC(upcCode) {
    let item = ""
    fetch(url,{method: "GET", mode: "no-cors", headers: {
        "Accept": "application/json"
    }}).then(response => response.json()).then(result => this.setState({brandName: result.items[0].brand})).catch(err =>console.log(err))
}
    // setTimeout(function(){
    //     stored = item
    //     returnItem()
    // },4000)

    // function returnItem() {
    //     console.log(item)
    // }




console.log(findUPC('039304243905'))


// https://api.upcitemdb.com/prod/trial/lookup?upc=039304243905