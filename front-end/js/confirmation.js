function confirmation() {
    const orderId = document.querySelector("#orderId");
    const orderIdUrl = new URL(location.href).searchParams.get("id");
    orderId.textContent = orderIdUrl;
  
    // deleting order from localStorage
    localStorage.removeItem("product");
  }
  
  confirmation()

