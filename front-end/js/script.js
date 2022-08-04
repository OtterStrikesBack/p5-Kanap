fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) =>  addProduct(data))


function addProduct(data) {

    
    const imageUrl = data[0].imageUrl


    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.text = "Kanap Sinopé"

    const items = document.querySelector("#items")
    if (items) {
        items.appendChild(anchor)
    }
}


