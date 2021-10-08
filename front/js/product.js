let myApi = new API()
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id")
test()

async function test() {
    let oneProduct = await myApi.getOneProduct(id)

    console.log(oneProduct)
    if (Object.keys(oneProduct).length !== 0) {
        let myProduct = new DomManager(oneProduct)
        myProduct.insertInProduct()
    } else {
        window.location.href = "index.html";
    }
}

