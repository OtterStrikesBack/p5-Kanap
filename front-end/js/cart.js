
const cart = []

const orderButton = document.querySelector("#order")
    orderButton.addEventListener("click", (e) => submitForm(e))

getItems()
cart.forEach(item => displayItem(item))

/*getting items from the localStorage*/
function getItems(){
    const numberOfItems = localStorage.length
    for(let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemKanap = JSON.parse(item)
        cart.push(itemKanap)
    }
}
/*displaying items*/
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

function displayQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0) 
    totalQuantity.textContent = total
}


function displayTotalPrice (){
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total   
}

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

function addDelete(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

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


function submitForm(e){
    e.preventDefault()
    if (cart.length === 0){ alert("Veuillez sélectionner des produits")
    return
    }

    if (invalideForm()) return 
    if (invalideEmail()) return

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

}

function invalideForm(){
    const form = document.querySelector("cart__order__form")
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === ""){
        alert("Veuillez renseigner tous les champs")
        return true
        }
        return false
    })
}

/*using regex to check if email is valid*/
function invalideEmail(){
    const email = document.querySelector("#email").value
    const emailReg = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (emailReg.test(email) === false) {
        alert("Veuillez renseigner une email correcte")
        return true
    }
    return false
}

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
}

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
