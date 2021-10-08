
let myApi = new API()
myApi.getAllProducts().then(function(allProducts){
  allProducts.forEach(function(oneProduct){
    let myProduct = new DomManager(oneProduct)
    myProduct.insertInIndex()
  })
})





