/*fetching products from API*/
fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => addProduct(data))
.catch(() =>
      alert("Nous rencontrons actuellement un souci technique, merci de réessayer ultérieurement")
    );

/*add items to main page*/
function addProduct(data) {  
    
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
/*creating anchor for each item, pulling it from back-end and redirecting to correct item with id*/
function createAnchor(_id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + _id
    return anchor
}

/*adding article, image, h3 and p to artiche*/
function appendToArticle(article, image, h3, p){
   
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    
}

/*appending article to the anchor*/
function appendToAnchor(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        anchor.appendChild(article)
        items.appendChild(anchor)
    }

}

/*creating image with alt text*/
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

/*creating name's product*/
function createH3(name) {
   const h3 = document.createElement("h3")
   h3.textContent = name
   h3.classList.add("productName")
   return h3

}

/*creating paragraph with item's description*/
function createParagraph(description) {

    const p = document.createElement("p")
    p.textContent = description
    p.classList.add = ("productDescription")
    return p
}


