

putItemInCartPage()
document.getElementById("submit-order").addEventListener("click", function(event){
    event.preventDefault()
    // On récupère les données
    let form = document.getElementById("contact-form")
    let formContact = new FormData(form)
    let firstname = formContact.get("firstname")
    let lastname = formContact.get("lastname")
    let city = formContact.get("city")
    let address = formContact.get("address")
    let email = formContact.get("email")

    // On les formate pour l'api
    let contactObject = {
        firstName: firstname,
        lastName: lastname,
        city: city,
        address: address,
        email: email
    }
    let myApi = new API()
    myApi.postCommand(contactObject).then(function(response){
        console.log(response)
        alert("Votre commande est validée, voici le numéro de commande : " + response.orderId)
        let myCart = new Cart()
        myCart.reset()
    })
})