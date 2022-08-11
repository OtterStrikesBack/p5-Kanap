const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")


fetch("http://localhost:3000/api/products/" + id)
.then ((response) => response.json())
.then((res) => handleData(res))

function handleData(kanap) {

    const {altTxt, colors, description, imageUrl, name, price} = kanap
    
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
