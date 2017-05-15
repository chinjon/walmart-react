# :department_store: Walmart React App :department_store:  


### :zap: Links :zap:  
[Heroku Link](https://walmart-react.herokuapp.com/)  
[Trello Board](https://trello.com/b/Nzh9mvgy/walmart-react)  

## :running: How To Run :running:  

1. `clone` repo to desktop  
2. Open terminal and `cd` into `walmart-react`  
3. In terminal, run `yarn install` or `npm install` to download dependencies  
4. **IMPORTANT** Make sure an **API KEY** is obtained!
    - Must have a `hide.js` file placed in the root of the `src` folder.  
    - Key can be obtained from Walmart (for FREE) or contact me.  
    - Inside `hide.js` have key stored in `module.exports` object like so:  
        ```
        module.exports = {
            KEY: 'API_KEY_HERE'
        }
        ```
5. Run `yarn start` and application will be running in `localhost: 3000`

## :book: General Info :book:  

An application that utilizes the Walmart Search API to pull in the store's product database.  

#### :floppy_disk: Technologies :floppy_disk:  

- [Bulma CSS](http://bulma.io/)  
- ***`create-react-app` CLI***
- React JS  
    - Radium  
    - React Animations  
- [Walmart Search API](https://developer.walmartlabs.com/docs/read/Search_API)  

## :key: The App :key:  

## :pencil: Planning :pencil:  

[Wireframe](https://app.moqups.com/indieslap/ilZbWZIs43/view/page/a0d4dc3eb)  

## :checkered_flag: Functionality :checkered_flag:  

## :pensive: Short Comings :pensive:  

## :white_check_mark: To-Do's :white_check_mark:  

##### **REFACTORING**  
As always code, could be much shorter. There are a few sections where functional programming and higher-order-function can cut down on the amount of code.