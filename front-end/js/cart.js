
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

// Function at launching
const init = async () => {
  const productLS = await getProductLS();
  displayProduct(productLS);
  deleteItem(productLS);
  totalQuantity();
  checkProductLS();
};

init();

// Getting products from localStorage
function getProductLS() {
  return JSON.parse(localStorage.getItem("product"));
}
const cartItem = document.querySelector("#cart__items");

// Checking if localStorage is empty
async function checkProductLS() {
  const productLS = await getProductLS();
  if (productLS.length == 0) {
    cartItem.textContent = "Il n'y a aucun produit dans le panier";
    return true;
  }
}

// Displaying products DOM
async function displayProduct(productLS) {
  if (productLS.length > 0) {
    for (let item of productLS) {
      fetch(`http://localhost:3000/api/products/${item.id}`)
        .then((data) => data.json())
        .then((product) => {
          // Creating article
          const article = document.createElement("article");
          article.setAttribute("class", "cart__item");
          article.setAttribute("data-id", `${item.id}`);
          article.setAttribute("data-color", `${item.color}`);

          // creating container img + img
          const cartItemImg = document.createElement("div");
          cartItemImg.setAttribute("class", "cart__item__img");
          const img = document.createElement("img");
          img.setAttribute("src", `${item.imageUrl}`);
          img.setAttribute("alt", `${product.altTxt}`);

          // creating container content + content
          const cartItemContent = document.createElement("div");
          cartItemContent.setAttribute("class", "cart__item__content");
          const cartItemContentDescription = document.createElement("div");
          cartItemContentDescription.setAttribute(
            "class",
            "cart__item__content__description"
          );
          const h2Description = document.createElement("h2");
          h2Description.textContent = `${item.name}`;
          h2Description.setAttribute("class", "name");
          const pColor = document.createElement("p");
          pColor.textContent = `${item.color}`;
          pColor.setAttribute("class", "color");
          const pPrice = document.createElement("p");
          pPrice.textContent = `${product.price} €`;
          pPrice.setAttribute("class", "price");

          // Content settings
          const cartItemContentSettings = document.createElement("div");
          cartItemContentSettings.setAttribute(
            "class",
            "cart__item__content__settings"
          );
          const cartItemContentSettingsQuantity = document.createElement("div");
          cartItemContentSettingsQuantity.setAttribute(
            "class",
            "cart__item__content__settings__quantity"
          );
          const contentSettingsP = document.createElement("p");
          contentSettingsP.textContent = "Qté : ";
          const inputQuantity = document.createElement("input");
          inputQuantity.setAttribute("type", "number");
          inputQuantity.setAttribute("class", "itemQuantity");
          inputQuantity.setAttribute("name", "itemQuantity");
          inputQuantity.setAttribute("min", "1");
          inputQuantity.setAttribute("max", "100");
          inputQuantity.setAttribute("value", `${item.quantity}`);

          // delete container + delete
          const deleteContainer = document.createElement("div");
          deleteContainer.setAttribute(
            "class",
            "cart__item__content__settings__delete"
          );
          const pDelete = document.createElement("p");
          pDelete.setAttribute("class", "deleteItem");
          pDelete.textContent = "Supprimer";

          cartItem.appendChild(article);
          article.appendChild(cartItemImg);
          article.appendChild(cartItemContent);
          cartItemImg.appendChild(img);
          cartItemContent.appendChild(cartItemContentDescription);
          cartItemContent.appendChild(cartItemContentSettings);
          cartItemContentDescription.appendChild(h2Description);
          cartItemContentDescription.appendChild(pColor);
          cartItemContentDescription.appendChild(pPrice);
          cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
          cartItemContentSettings.appendChild(deleteContainer);
          cartItemContentSettingsQuantity.appendChild(contentSettingsP);
          cartItemContentSettingsQuantity.appendChild(inputQuantity);
          deleteContainer.appendChild(pDelete);

          totalPrice();
          totalQuantity();
          changeQuantity(product, productLS);
          deleteItem(product);
          checkProductLS();
        })
        .catch(() =>
          alert(
            "Nous rencontrons actuellement un souci technique, merci de réessayer ultérieurement"
          )
        );
    }
  }
}

// Displaying to total price of all the items in cart
async function totalPrice() {
  let kanap = await getProductLS();
  let quantities = document.querySelectorAll(".itemQuantity");
  let prices = document.querySelectorAll(".cart__item__content__description");
  let cartPrice = 0;
  for (let i = 0; i < prices.length; i++) {
    cartPrice +=
      parseInt(prices[i].lastElementChild.textContent) * quantities[i].value;
  }
  document.getElementById("totalPrice").textContent = cartPrice;
  saveProductLS(kanap);
}

// Display the total quantity of items
async function totalQuantity() {
  let kanap = await getProductLS();
  let total = 0;
  for (const item of kanap) {
    total += parseInt(item.quantity);
  }
  const tQuantity = document.querySelector("#totalQuantity");
  tQuantity.textContent = total;
  saveProductLS(kanap);
}

// delete element from LS
function deleteItem(product) {
  const deleteButtons = document.querySelectorAll(".deleteItem");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const target = e.target.closest(".cart__item").dataset.id;
      const color = e.target.closest(".cart__item").dataset.color;
      const deleteItem = e.target.closest(".cart__item");
      let kanap = await getProductLS();
      kanap = kanap.filter((item) => {
        return item.id != target || item.color != color;
      });
      deleteItem.remove();
      saveProductLS(kanap);
      totalQuantity();
      totalPrice();
      checkProductLS();
    });
  });
}

// Saving in localStorage
function saveProductLS(product) {
  return localStorage.setItem("product", JSON.stringify(product));
}

// Changing quantity from the cart
async function changeQuantity(product, productLS) {
  let kanap = await getProductLS();
  let inputQuantity = document.querySelectorAll(".itemQuantity");

  inputQuantity.forEach((item) => {
    item.addEventListener("input", (e) => {
      const target = e.target.closest(".cart__item").dataset.id;
      const color = e.target.closest(".cart__item").dataset.color;
      let kanapFind = kanap.find((item) => {
        return item.id == target && item.color == color;
      });
      kanapFind.quantity = parseInt(e.target.value);
      saveProductLS(kanap);
      totalQuantity();
      totalPrice();
    });
  });

}
// Regex for form
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


// submiting form with alert if cart empty + redirecting to confirmation page 
function submitForm(e){
    const cart = getProductLS();
    e.preventDefault()
    if (cart.length === 0){ alert("Votre panier est vide")
    return
    }  
    else if (allInputValid == false) {
        alert("Veuillez vérifier vos détails")
        return               
       }
       else { confirmCart()}
    }
// Confirming cart
function confirmCart() {
  const productLS = getProductLS();
  // New array with ids only in localStorage
  const newProduct = productLS.map((item) => {
    return item.id;
  });
  const order = {
    contact: {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
      city: document.getElementById("city").value,
    },
    products: newProduct,
  };

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: { 
        "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      location.href = `confirmation.html?id=${data.orderId}`;

    })
    .catch(() =>
      alert("Nous rencontrons actuellement un problème, merci de réessayer ultérieurement")
    );
}

