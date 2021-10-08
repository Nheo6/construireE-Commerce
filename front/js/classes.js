// noinspection JSValidateTypes

class API {
    constructor() {
        this.url = "http://localhost:3000/api/furniture/"
    }

    async getAllProducts() {
        let response = await fetch(this.url)
        return await response.json()
    }

    async getOneProduct(id) {
        let response = await fetch(this.url + id)
        return await response.json()
    }

    async postCommand(contact){
        let myCart = new Cart()
        let products = []
        myCart.content.forEach(function(oneProduct){
            products.push(oneProduct._id)
        })
        let toSend = JSON.stringify({contact, products})
        let response = await fetch(this.url + "order", {
            method: "POST",
             headers: {
                'Content-Type': 'application/json'
            },
            body: toSend
        })
        return await response.json()
    }

}

class DomManager {
    constructor(oneProduct) {
        this.oneProduct = oneProduct
        console.log(this.oneProduct)
    }

    insertInIndex(){
        let productContainer = document.getElementById("products-container")
        let template = `<div class="mbot-1 col-lg-3 offset-lg-1 col-sm-6 col-12 border">
                            <a href="product.html?id=${this.oneProduct._id}">
                                <div class="row">
                                    <div class="col-12">
                                        <h3>
                                            ${this.oneProduct.name}
                                        </h3>
                                    </div>
                                    <div class="col-12">
                                        <img class="img-fluid" src="${this.oneProduct.imageUrl}"
                                             alt="">
                                    </div>
                                    <div class="col-12">
                                        <p>
                                            Prix : ${this.oneProduct.price / 100}€
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>`
        productContainer.innerHTML += template
    }

    insertInProduct(){
        let myProduct = this.oneProduct
        document.getElementById("name").innerText = myProduct.name
        document.getElementById("price").innerText = myProduct.price / 100
        document.getElementById("product-image").src = myProduct.imageUrl
        document.getElementById("add-to-cart").addEventListener("click", function(){
            let myCart = new Cart()
            myCart.add(myProduct)
        })
    }

    insertInCartPage(){
        let container = document.getElementById("cart-container")
        let template = `<div class="col-12 text-center border">
                            <div class="row">
                                <div class="col-3">
                                    <img class="img-fluid min-height-img"
                                         src="${this.oneProduct.imageUrl}" alt="">
                                </div>
                                <div class="col-3 cart-align">
                                    <h5 class="display-5">
                                        ${this.oneProduct.name}
                                    </h5>
                                </div>
                                <div class="col-3 cart-align">
                                    Prix : ${this.oneProduct.price / 100}€
                                </div>
                                <div class="col-1 cart-align">
                                    ${this.oneProduct.quantity}
                                </div>
                                <div class="col-2 cart-align">
                                    <button onClick="removeItem('${this.oneProduct._id}')">
                                        Supr
                                    </button>
                                </div>
                            </div>
                        </div>`
        container.innerHTML += template
    }
}

class Cart {
    constructor() {
        this.nameInStorage = "cart"
        this.content = []
        this.get()
    }

    reset(){
        this.content = []
        this.save()
    }

    get(){
        this.content = localStorage.getItem(this.nameInStorage)
        if (this.content === null) {
            this.content = []
        } else {
            this.content = JSON.parse(this.content)
        }
    }

    remove(oneProduct){
        let indexToRemove = null
        this.content.forEach(function(oneItem, index){
            if (oneProduct._id === oneItem._id) {
                indexToRemove = index
            }
        })
        if (indexToRemove !== null) {
            this.content.splice(indexToRemove, 1)
            this.save()
        }
    }

    save(){
        localStorage.setItem(this.nameInStorage, JSON.stringify(this.content))
    }

    add(oneProduct){
        let alreadyExists = false
        this.content.forEach(function(oneElement){
            if (oneElement._id === oneProduct._id) {
                alreadyExists = true
                oneElement.quantity += 1
            }
        })
        if (alreadyExists === false) {
            let productToSave = {
                name: oneProduct.name,
                imageUrl: oneProduct.imageUrl,
                quantity: 1,
                price: oneProduct.price,
                _id: oneProduct._id
            }
            this.content.push(productToSave)
        }
        this.save()
    }
}