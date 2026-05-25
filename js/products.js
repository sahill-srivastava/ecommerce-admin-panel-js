// DOM refs
import { appContent } from "./refs.js";
import { items } from "./refs.js";
import { addProductBtn } from "./refs.js";

//localestorage imports
import { saveProducts, loadProducts } from "./storage.js";

// Helpers imports
import {
    handleIconHover
} from "./helpers.js";

// Modals
import {
    modalOverlay,
    addModalBox,
    editModalBox,
    addForm
} from "./refs.js";


/*----------------States-----------------*/

let products = [];


/*----------------Helpers functions-----------------*/

function validateData(result) {

    if (!result.success) return;

    // console.log("result: ", result)

    const temp = [];

    result.products.forEach(item => {

        const {
            id,
            thumbnail,
            title,
            price,
            stock
        } = item;

        temp.push({
            id,
            thumbnail,
            title,
            price,
            stock
        })

    })

    return temp;
}

function createProductsTable(products) {

    appContent.innerHTML = "";

    // console.log("products: ", products)

    appContent.innerHTML = `
    <button id="add-product" class="add_button" title="Add Product">Add Product</button>

                <div class="parent_holder">

                    <div class="parent_container">

                        <div class="row row_five row_header">
                            <div>Image</div>
                            <div>Name</div>
                            <div>Price (Rs)</div>
                            <div>Stock</div>
                            <div>Actions</div>
                        </div>

                    </div>

                     <div class="row_parent product_row_parent">
                     </div>

                </div>
  `

    const parentContainer = document.querySelector(".row_parent");

    products.forEach(item => {

        const id = item.id;
        const price = +((item.price * 100).toFixed(0));
        const stock = item.stock;
        const name = item.title;
        const image = item.thumbnail;

        // console.log(name, price)

        const div = document.createElement("div");
        div.id = id;
        div.classList.add("row", "row_five");


        div.innerHTML = `
     
        <div class="image_box boxes">
            <img src="${image}" alt="${name}">
        </div>
        <div class="name_box boxes">${name}</div>
        <div class="price_box boxes">${price.toLocaleString('en-IN')}</div>
        <div class="stock_box boxes">${stock}</div>
        <div class="action_box boxes">
          <lord-icon class="edit_button" src="https://cdn.lordicon.com/exymduqj.json" title="Edit" trigger="loop"
          colors="primary:#109121,secondary:#109121">
          </lord-icon>
          <lord-icon class="delete_button" src="https://cdn.lordicon.com/jzinekkv.json" title="Delete" trigger="hover"
            colors="primary:#e83a30,secondary:#e83a30">
          </lord-icon>
        </div>
      
    `

        parentContainer.append(div);


    })



}


/*----------------UI functions-----------------*/

function renderProducts(products) {

    // console.log("products: ", products)
    // console.log(appContent);

    createProductsTable(products);

}


function addProduct(products) {
    // console.log("add products: ", products)
    modalOverlay.classList.add("active")
}

function editProduct(id, products) {
    console.log("edit prod: ", id, products)
}

function deleteProduct(id) {

    // console.log("del prod: ", id, products)

    //update products state and update the localestorage


    products = products.filter(item => item.id !== id)

    // console.log(products)
    renderProducts(products)

    localStorage.setItem("items", JSON.stringify(products));

}

function handleEvents(e) {

    // console.log(e.target);

    const addBtn = e.target.closest("#add-product")
    const editBtn = e.target.closest(".edit_button")
    const delBtn = e.target.closest(".delete_button")

    if (addBtn) {
        // console.log("add")
        addProduct(products);
    }

    if (editBtn) {
        // console.log("edit")
        const parent = editBtn.closest(".row")
        const id = +(parent.id)
        editProduct(id, products);
    }

    if (delBtn) {
        // console.log("del")
        const parent = delBtn.closest(".row")
        const id = +(parent.id)
        deleteProduct(id)
    }
}


function validateFormData(data) {
    const formData = Object.fromEntries(data.entries());

    const {
        image,
        title,
        price,
        stock,
    } = formData;

    console.log(image)
    console.log(title)
    // console.log(price)
    // console.log(stock)

    //validate image
    const allowedImages = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    if (!allowedImages.includes(image.type)) {
        alert("Invalid image");
        return;
    }

    if (image.size > (2 * 1024 * 1024)) return

    //validate title
    const name = title.trim();
    console.log(name)


}



/*----------------Data functions-----------------*/

function handleAddProductForm(e) {
    e.preventDefault();

    // console.log("add products: ", products)
    // console.dir(e.target)

    const data = new FormData(e.target);

    validateFormData(data)



}

async function getProducts() {

    try {

        const res = await fetch("js/utils/rawProductsData.json");

        // console.log(res)

        const data = await res.json();

        // console.log(data)

        const { products } = data;

        // console.log(products)

        return {
            success: true,
            products,
            error: null,
            errorMsg: "Products fetched successfully"
        }

    } catch (err) {
        return {
            success: false,
            products: [],
            error: err,
            errorMsg: "Products Not Found"
        }
    }
}


export async function handleProducts() {

    //handle icon hover
    handleIconHover();

    if (!products.length) {

        const result = await getProducts();

        // console.log("result: ", result)

        // extract required values
        const cleanProducts = validateData(result);

        //save to localeStorage
        saveProducts(cleanProducts);

        //load from localestorage
        products = [...cleanProducts];

        // console.log("final prod: ", products)
    }

    renderProducts(products)
}





/*----------------Data functions-----------------*/

appContent.addEventListener("click", handleEvents)

addForm.addEventListener("submit", handleAddProductForm);
