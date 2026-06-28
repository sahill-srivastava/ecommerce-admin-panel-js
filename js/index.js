import { sidebarBtns, addProductBtn } from "./utils/refs.js";
import { handleProducts } from "./products.js";
import { handleOrders } from "./order.js";
import { handleUsers } from "./users.js";
import { handleSettings } from "./settings.js";


/*----------------Events-----------------*/

// document.addEventListener("DOMContentLoaded", handleProducts);

sidebarBtns.productsBtn.addEventListener("click", handleProducts)
sidebarBtns.ordersBtn.addEventListener("click", handleOrders)
sidebarBtns.usersBtn.addEventListener("click", handleUsers)
sidebarBtns.settingsBtn.addEventListener("click", handleSettings)


