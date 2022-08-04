fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) =>  {
    console.log(data)
    return addProduct(data)
})


function addProduct(data) {    
    const id = data[0]._id
    const anchor = createAnchor(id)
    appendChildren(anchor)
}

function createAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=42" + id
    return anchor
}

function appendChildren(anchor) {
    const items = document.querySelector("#items")
    if (items) {
        items.appendChild(anchor)
    }

}

function createArticle() {

}

function createImage() {


}

function createH3() {


}

function createParagraph() {


}

