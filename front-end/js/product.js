    
// Getting id from URL
const productId = new URL(location.href).searchParams.get("id");
(async () => {
  const product = await getOneProduct();
  displayProduct(product);
})();
const button = document.querySelector("button");
const result = document.querySelector(".item");

// Getting product from IP using ID
async function getOneProduct() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    const body = await response.json();
    return body;
  } catch (e) {
    alert("Nous rencontrons actuellement un souci technique, merci de réessayer ultérieurement")
  }
}

// Displaying product
function displayProduct(product) {
  // changing tab's name depending on product's name
  document.title = `${product.name}`;

  // Creating image
  const itemImg = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.setAttribute("src", `${product.imageUrl}`);
  img.setAttribute("alt", `${product.altTxt}`);
  itemImg.appendChild(img);

  // Creatinng H1
  const itemContent = document.querySelector(".item__content__titlePrice");
  const h1 = document.createElement("h1");
  h1.textContent = `${product.name}`;
  itemContent.appendChild(h1);

  // Creating price
  const itemPrice = document.querySelector("#price");
  itemPrice.textContent = `${product.price}`;

  // Creating description
  const itemDescription = document.querySelector("#description");
  itemDescription.textContent = `${product.description}`;

  // Creating colors
  const select = document.querySelector("select");
  for (let color of product.colors) {
    const option = document.createElement("option");
    option.textContent = color;
    option.value = color;
    select.appendChild(option);
  }
  const containerButton = document.querySelector(".item__content__addButton");
  containerButton.appendChild(button);
}

// Creating localStorage
async function createLS() {
  const inputQuantity = document.querySelector("#quantity");
  const product = await getOneProduct();
  const select = document.querySelector("select");
  const obj = {
    id: product._id,
    quantity: parseInt(inputQuantity.value),
    color: select.value,
    name: product.name,
    imageUrl: product.imageUrl,
  };
  let kanap = getProductLS();
  let kanapFind = kanap.find((item) => {
    return item.id == product._id && item.color == select.value;
  });
  // if item isn't in localStorage
  if (
    (inputQuantity.value < 1 || inputQuantity.value > 100) &&
    select.value == ""
  ) {
    alert(
      "Merci de choisir une couleur et de rentrer une quantité comprise entre 1 et 100"
    );
  } else if (select.value == "") {
    alert("Merci de choisir une couleur");
  } else if (inputQuantity.value < 1 || inputQuantity.value > 100) {
    alert("Merci de rentrer une quantité comprise entre 1 et 100");
  } else {
    alert(
      `Le produit ${product.name} a été ajouté au panier en ${inputQuantity.value} exemplaire(s)`
    );
    if (!kanapFind) {
      kanap.push(obj);
      // if in LS with same color
    } else if (kanapFind) {
      kanapFind.quantity += parseInt(inputQuantity.value);
      // if in LS but color is different
    } else if (kanapFind && kanapFind.color != select.value) {
      kanap.push(obj);
    }
    saveProductLS(kanap);
  }
}

// Saving in localStorage
function saveProductLS(product) {
  return localStorage.setItem("product", JSON.stringify(product));
}

// Getting localStorage
function getProductLS() {
  let product = JSON.parse(localStorage.getItem("product"));
  if (product == null) {
    return [];
  } else {
    return product;
  }
}

button.addEventListener("click", createLS);