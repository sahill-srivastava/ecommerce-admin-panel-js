import {sidebarBtns, addProductBtn } from "./refs.js";
import { handleProducts } from "./products.js";
import { handleOrders } from "./order.js";
import { handleUsers } from "./users.js";


/*----------------Events-----------------*/

document.addEventListener("DOMContentLoaded", handleProducts);

sidebarBtns.productsBtn.addEventListener("click", handleProducts)
sidebarBtns.ordersBtn.addEventListener("click", handleOrders)
sidebarBtns.usersBtn.addEventListener("click", handleUsers)


