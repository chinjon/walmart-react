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


// sort array
const compare =(a,b)=>{
    const itemA = a.name.toUpperCase();
    const itemB = b.name.toUpperCase();

    let comparison = 0;
    if(itemA > itemB) {
        comparison = 1
    } else if (itemA < itemB) {
        comparison = -1
    }
    return comparison
};

console.log(newItemsArr.sort(compare));
// console.log(newItemsArr.sort(compare).reverse())