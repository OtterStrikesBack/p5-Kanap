const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
const url = 'http://localhost:3000/api/products/' + id


/*fetch datas from API*/
fetch (url)
.then ((response) => response.json())
.then((res) => handleData(res))

/*showing all details of the item*/
function handleData(kanap) {

    const {altTxt, colors, description, imageUrl, name, price} = kanap
    
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    createImage(imageUrl, altTxt)
    createTitle(name)
    createColors(colors)
    createDescription(description)
    createPrice(price)
 
}



function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector("item__img")
    if (parent != null) parent.appendChild(image)
}


function createTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 !=null) h1.textContent = name
}


function createPrice (price) {

    const span = document.querySelector("#price")
    if (span !=null) span.textContent = price

}

function createDescription (description) {

    const p = document.querySelector("#description")
    if (p !=null) p.textContent = description
}

/*adding colors to select from*/
function createColors (colors) {
    const select = document.querySelector("#colors")
    if (colors !=null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

/*adding to cart + validator*/
const button = document.querySelector("#addToCart")
if (button != null){
    button.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        const quantity  = document.querySelector("#quantity").value

            if (color == null || color === "" || quantity == null || quantity === 0){
            alert ("Veuillez sélectionner la couleur et quantité désirées")
            return alert
        }

        const key = `${id}-${color}`
        const data = {
            id: id,
            color: color,
            quantity: Number(quantity),
            price: itemPrice,
            imageUrl: imgUrl,
            altTxt: altText,
            name: articleName
        }

           localStorage.setItem(key, JSON.stringify(data))
           window.location.href = "cart.html"
 
    })
}