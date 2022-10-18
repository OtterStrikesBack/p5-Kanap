const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")
const url = 'http://localhost:3000/api/products/' + productId




/*fetch datas from API*/
fetch (url)
.then ((response) => response.json())
.then((res) => handleData(res))
.catch(() =>
      alert("Nous rencontrons actuellement un souci technique, merci de réessayer ultérieurement")
    );


/*showing all details of the item*/
function handleData(kanap) {

    const {altTxt, colors, description, imageUrl, name, price} = kanap

    itemPrice = price
    image = imageUrl
    altText = altTxt
    articleName = name
    createImage(imageUrl, altTxt)
    createTitle(name)
    createColors(colors)
    createDescription(description)
    createPrice(price)

 
}
/*creating image with alt text*/
function createImage(imageUrl, altTxt) {
    const parent = document.querySelector(".item__img");
    const image = document.createElement("img");
    image.src = imageUrl
    image.alt = altTxt
    parent.appendChild(image);    
}
 

/*creating item's name*/
function createTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 !=null) h1.textContent = name
}

/*creating price*/
function createPrice (price) {

    const span = document.querySelector("#price")
    if (span !=null) span.textContent = price

}
/*creating item's description*/
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

/*creating localStorage*/
function createLS() {
    const inputQuantity = document.querySelector("#quantity");
    const color = document.querySelector("#colors").value;
    const data = getItems();
    const select = document.querySelector("select");
    const obj = {
        id: productId._id,
        color: color,
        quantity: parseInt(inputQuantity.value),
        price: itemPrice,
        imageUrl: image,
        altTxt: altText,
        name: articleName
    };
    const kanap = getItems();
    const kanapFind = kanap.find((item) => {
      return item.id == productId._id && item.color == color;
    });
    /*if item isn't in localStorage*/
  if (
    (inputQuantity.value < 1 || inputQuantity.value > 100) &&
    select.value == ""
  ) {
    alert(
      "Veuillez choisir une couleur et une quantité comprise entre 1 et 100"
    );
  } else if (select.value == "") {
    alert("Veuillez choisir une couleur");
  } else if (inputQuantity.value < 1 || inputQuantity.value > 100) {
    alert("Veuillez choisir une quantité comprise entre 1 et 100");
  } else {
    alert(
      `Votre article a bien été rajouté à votre panier`
    );
    if (!kanapFind) {
      kanap.push(obj);
      /*if same color*/
    } else if (kanapFind) {
      kanapFind.quantity += parseInt(inputQuantity.value);
      /*if color is different*/
    } else if (kanapFind && kanapFind.color != select.value) {
      kanap.push(obj);
    }
    saveItems(kanap);
  }
}

/*save in localStorage*/
function saveItems(data) {
    return localStorage.setItem("product", JSON.stringify(data));
  }
  
  // Get back localStorage
  function getItems() {
    let product = JSON.parse(localStorage.getItem("product"));
    if (product == null) {
      return [];
    } else {
      return product;
    }
  }
  
  button.addEventListener("click", createLS);
    

/*if (button != null){
   button.addEventListener("click", (e) => {
   const color = document.querySelector("#colors").value
   const quantity  = document.querySelector("#quantity").value

       if (color == null || color === "" || quantity == null || quantity === 0){
            alert ("Veuillez sélectionner la couleur et quantité désirées")
            return alert
        }
        if (color == null || color === ''){
            alert ("Veuillez sélectionner une couleur")
            return alert
        }
        else if (color != null || color !='') {
            if (quantity.value < 1 || quantity.value > 100){
                alert ("Veuillez sélectionner une quantité comprise entre 1 et 100")
            }
        }

        else if (quantity.value >=1 && quantity.value <= 100 && color != null) {
            alert ("Votre article a bien été ajouté au panier")
        }


        const key = `${id}-${color}`
        const data = {
            id: id,
            color: color,
            quantity: Number(quantity),
            price: itemPrice,
            imageUrl: image,
            altTxt: altText,
            name: articleName
        }

           localStorage.setItem(key, JSON.stringify(data))
    })
}
}*/


           

           