/*array, items will be push with cart.push()*/
const cart = []
const orderButton = document.querySelector("#order")
      orderButton.addEventListener("click", (e) => submitForm(e))

getItems()
cart.forEach(item => displayItem(item))

/*getting items from the localStorage*/

  function getItems() {
    let product = JSON.parse(localStorage.getItem("product"));
    
    if (product == null) {
      return [];
    }
     else {
        product.forEach(item => cart.push(item))
    }
    
  }

/*displaying items in the cart*/
function displayItem(item){
    
    const article = createArticle(item)
    const div = createImageDiv(item)
    article.appendChild(div)
    const cartItemContent = createCartContent(item)  
    article.appendChild(cartItemContent)  
    displayArticle(article)
    displayQuantity()
    displayTotalPrice()
  

}

/*displaying description with name, color chosen and price of item*/
function createDescription(item){
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p2")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description

}
function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)

}
function createArticle(item){
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function createImageDiv(item){
    
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

/*displaying total quantity of items*/
function displayQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0) 
    totalQuantity.textContent = total
}

/*displaying total price*/
function displayTotalPrice (){
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total   
}

/*displaying item */
function createCartContent(item){
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = createDescription(item)
    const settings = createSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

/*settings used to modify quantity or delete items from cart*/
function createSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantity(settings, item)
    addDelete(settings, item)
    return settings
}

/*addind "delete" button*/
function addDelete(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

/*function to delete item in cart and returning new total price/item*/
function deleteItem(item){
 
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
        )
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayQuantity()
    deleteDataFromCache(item)
    deleteArticleFromCart(item)
    
}

function deleteArticleFromCart(item){
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
    
}
/*remove item from the DataCache*/
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

/*change the quantity of items in the cart*/
function addQuantity(settings, item){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("ItemQuantity")
    input.name = "ItemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updateQuantityAndPrice(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)


}

/*updating the quantity and price in the cart*/
function updateQuantityAndPrice(id, newValue, item){
    const valueToUpdate = cart.find(item => item.id === id)
    valueToUpdate.quantity = Number(newValue)
    item.quantity = valueToUpdate.quantity
    displayQuantity()
    displayTotalPrice()
    newDataToCache(item)
}

/*change datas in cache*/
function newDataToCache(item){
    const data = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, data)
}

/*Regex for form*/
let firstNameRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let lastNameRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let cityRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

let firstName = document.getElementById('firstName')
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
let lastName = document.getElementById('lastName')
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
let address = document.getElementById('address')
let addressErrorMsg = document.getElementById('addressErrorMsg')
let city = document.getElementById('city')
let cityErrorMsg = document.getElementById('cityErrorMsg')
let email = document.getElementById('email')
let emailErrorMsg = document.getElementById('emailErrorMsg')
let submit = document.getElementById('order')
let formErrorMsg = document.getElementById('formErrorMsg')

let allforminputs = document.querySelectorAll('.cart__order__form__question input')


let allInputValid = false

let firstnregex 
firstName.addEventListener("input", (e) =>{
    firstnregex = firstNameRegExp.test(firstName.value)


    if (firstnregex == false){
        firstNameErrorMsg.innerHTML = "Votre prénom n'est pas valide.";
        allInputValid = false;
    }
    else {
        firstNameErrorMsg.innerHTML = "";
    }
})

let lastnregex
lastName.addEventListener("input", (e) =>{
    lastnregex = lastNameRegExp.test(lastName.value)


    if (lastnregex == false){
        lastNameErrorMsg.innerHTML = "Votre nom n'est pas valide.";
        allInputValid = false;
    }
    else {
        lastNameErrorMsg.innerHTML = "";
    }
})

let addressregex
address.addEventListener("input", (e) =>{
    addressregex = addressRegExp.test(address.value)


    if (addressregex == false){
        addressErrorMsg.innerHTML = "Votre addresse n'est pas valide.";
        allInputValid = false;
    }
    else {
        addressErrorMsg.innerHTML = "";
    }
})

let cityregex
city.addEventListener("input", (e) =>{
    cityregex = cityRegExp.test(city.value)


    if (cityregex == false){
        cityErrorMsg.innerHTML = "Votre ville n'est pas valide.";
        allInputValid = false;
    }
    else {
        cityErrorMsg.innerHTML = "";
    }
})

let emailregex
email.addEventListener("input", (e) =>{    
    emailregex = emailRegExp.test(email.value)


    if (emailregex == false){
        emailErrorMsg.innerHTML = "Votre email n'est pas valide.";
        allInputValid = false;
    }
    else {
        emailErrorMsg.innerHTML = "";
    }
})

allforminputs.forEach(function(button) {
    button.addEventListener("input", (e) =>{
        if (firstnregex == true && lastnregex == true && addressregex == true && cityregex == true && emailregex == true){
            allInputValid = true;
        }
    })
})



/*form*/
function makeRequestBody(){

    const firstName = document.getElementById("firstName")
    const lastName = document.getElementById("lastName")
    const address = document.getElementById("address")
    const city = document.getElementById("city")
    const email = document.getElementById("email")

    const body = { contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    },
    products: getIds()
   }
    return body


/*getting items ids from localStorage*/
function getIds() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++){
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)        
    }
    return ids
}

}
/* submiting form with alert if cart empty + redicting to confirmation page */
function submitForm(e){
    e.preventDefault()
    if (cart.length === 0){ alert("Votre panier est vide")
    return
    }  
    else if (allInputValid == false) {
        alert("Veuillez vérifier vos détails")
        return               
       }
   

    const body = makeRequestBody()
    fetch ("http://localhost:3000/api/products/order",{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => { 
        const orderId = data.orderId
        window.location.href = "/front-end/html/confirmation.html" + "?orderId=" + orderId
    } )
    .catch(() =>
      alert("Nous rencontrons actuellement un souci technique, merci de réessayer ultérieurement")
    );

}
