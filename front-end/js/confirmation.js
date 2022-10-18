const orderId = getOrderId()
showOrderId(orderId)
cleanCache()

/*getting orderId*/
function getOrderId(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
    
}

/*showing order id to customer*/
function showOrderId(orderId){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

/* removing items from the cache when order is validated*/
function cleanCache(){
    const cache = window.localStorage
    cache.clear()
}
