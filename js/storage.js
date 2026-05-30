export function saveProducts(products) {
    localStorage.setItem("items", JSON.stringify(products))
}

export function loadProducts() {
    return JSON.parse(localStorage.getItem("items"));
}