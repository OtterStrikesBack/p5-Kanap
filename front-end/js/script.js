fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => addProduct(data))


function addProduct(data) {  
    
    //const imageUrl = data[0].imageUrl
    //const altTxt = data[0].altTxt
    //const name = data[0].name
    //const description = data[0].description  
    data.forEach((product)=> {
    
        const {_id, imageUrl, altTxt, name, description} = product
        const image = createImage(imageUrl, altTxt)
        const anchor = createAnchor(_id)
        const article = document.createElement("article")
        const h3 = createH3(name)
        const p = createParagraph(description)


        appendToArticle(article, image, h3, p)
        appendToAnchor(anchor, article)
 })
}
function createAnchor(_id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + _id
    return anchor
}

function appendToArticle(article, image, h3, p){
   
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    
}


function appendToAnchor(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        anchor.appendChild(article)
        items.appendChild(anchor)
    }

}

function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function createH3(name) {
   const h3 = document.createElement("h3")
   h3.textContent = name
   h3.classList.add("productName")
   return h3

}

function createParagraph(description) {

    const p = document.createElement("p")
    p.textContent = description
    p.classList.add = ("productDescription")
    return p
}


