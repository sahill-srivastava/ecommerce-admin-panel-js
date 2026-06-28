//Products storage
export function saveProducts(products) {
    localStorage.setItem("items", JSON.stringify(products))
}

export function loadProducts() {
    return JSON.parse(localStorage.getItem("items"));
}

//Orders storage
export function saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders))
}

export function loadOrders() {
    return JSON.parse(localStorage.getItem("orders"));
}

//users storage
export function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users))
}

export function loadUsers() {
    return JSON.parse(localStorage.getItem("users"));
}