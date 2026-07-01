//Main
export const items = document.querySelectorAll('.icon_hover');
export const appContent = document.querySelector(".app_content");
export const formAppContent = document.querySelector(".form_app_content");

//Sidebar
export const sidebarBtns = {
    productsBtn: document.getElementById("products"),
    ordersBtn: document.getElementById("orders"),
    usersBtn: document.getElementById("users"),
    settingsBtn: document.getElementById("settings"),
    closeSidebarBtn: document.querySelector(".close_button")
}

//Products
export const addProductBtn = document.getElementById("add-product");

//Orders
export const orderModal = {
    customerName: document.querySelector(".customer_name"),
    orderId: document.querySelector(".order_id"),
    orderDate: document.querySelector(".order_date"),
    paymentStatus: document.querySelector(".payment_status"),
    orderStatus: document.querySelector(".order_status"),
    productsCount: document.querySelector(".products_count"),
    productsParent: document.querySelector(".order_products_parent"),
    orderTotal: document.querySelector(".order_total")
}

//settings - forms
export const adminForm = document.getElementById("admin-form")
export const formSubmitBtn = document.getElementById("save-detail")
export const formErrMsg = document.querySelector(".error-msg");

// Modals - overlay
export const modalOverlay = document.querySelector(".modal_overlay_container")

// Modals - Add form + Edit form
export const addFormContent = modalOverlay.querySelector(".modal_add_content_box");
export const inputAddImg = document.getElementById("add-image");
export const imagePrevAdd = document.getElementById("image-preview");
export const addForm = document.getElementById("add-form");

export const editFormContent = modalOverlay.querySelector(".modal_edit_content_box");
export const inputEditImg = document.getElementById("edit-image");
export const imagePrevEdit = document.getElementById("edit-image-preview");
export const editForm = document.getElementById("edit-form");