function removeItem(id) {
    let myApi = new API()
    myApi.getOneProduct(id).then(function (oneProduct) {
        let myCart = new Cart()
        myCart.remove(oneProduct)
        putItemInCartPage()
    })
}

function putItemInCartPage() {
    let myCart = new Cart()
    document.getElementById("cart-container").innerHTML = ""
    myCart.content.forEach(function (oneProduct) {
        let myProduct = new DomManager(oneProduct)
        myProduct.insertInCartPage()
    })
}