import {sidebarBtns, addProductBtn } from "./refs.js";
import { handleProducts } from "./products.js";
import { handleOrders } from "./order.js";


function handleOrderClick() {
    console.log("tapp")

    handleOrders();
}

/*----------------Events-----------------*/

document.addEventListener("DOMContentLoaded", handleProducts);

sidebarBtns.ordersBtn.addEventListener("click", handleOrderClick)


