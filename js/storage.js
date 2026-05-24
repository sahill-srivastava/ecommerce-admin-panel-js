export function saveProducts(products) {

    // console.log("prod: ", cleanProducts)

    localStorage.setItem("items", JSON.stringify(products))

}

export function loadProducts() {

    return JSON.parse(localStorage.getItem("items"));
}