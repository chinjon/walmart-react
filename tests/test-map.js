const data = require('./walmart-api-output.json');

let walItems = data.items;

const newItemsArr = walItems.map(e=>{
    var newObj = {
        name: e.name,
        category: e.categoryPath,
        img: e.thumbnailImage,
        rating: e.customerRating,
        url: e.productUrl
    };

    return newObj
})

console.log(newItemsArr);