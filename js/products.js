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
    inputAddImg,
    imagePrevAdd,
    inputEditImg,
    imagePrevEdit,
    addForm,
    addFormContent,
    editForm,
    editFormContent
} from "./refs.js";


/*----------------States-----------------*/

let products = [];

let currentEditingData = null;


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
    addFormContent.classList.add("show_modal")
}

function editProduct(id, products) {

    // console.log("edit prod: ", id, products)
    modalOverlay.classList.add("active")
    editFormContent.classList.add("show_modal")

    const imgPrev = editForm.querySelector("#edit-image-preview");

    // show existing elements

    const target = products.find(item => item.id === id);

    //pushing data inot currentData
    currentEditingData = {...target};

    const {
        thumbnail,
        title,
        price,
        stock
    } = target;

    imgPrev.src = thumbnail
    editForm[1].value = title
    editForm[2].value = price
    editForm[3].value = stock
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

    let {
        image,
        title,
        price,
        stock,
    } = formData;

    // console.log(image)
    // console.log(title)
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

    if (image.size > (3 * 1024 * 1024)) return

    const thumbnail = URL.createObjectURL(image)
    // console.log("lco: ", thumbnail)

    //validate title
    title = title.trim();

    // normalise price and stock
    price = +(price);
    stock = +(stock);

    const id = Date.now();

    return {
        id,
        thumbnail,
        title,
        price,
        stock
    }

}



/*----------------Data functions-----------------*/

function handleAddPreview() {

    // console.dir(inputAddImg)
    const file = inputAddImg.files[0];

    // console.log(file)

    const localURL = URL.createObjectURL(file);

    imagePrevAdd.src = localURL;
    imagePrevAdd.hidden = false;


}

function handleAddProductForm(e) {
    e.preventDefault();

    modalOverlay.classList.add("active")

    // console.log("add products: ", products)
    // console.log(e.target)

    let data = new FormData(e.target);

    data = validateFormData(data)

    // console.log("fresh data: ", data);

    products.unshift(data);


    // console.log("final pro: ", products)

    localStorage.setItem("items", JSON.stringify(products));

    renderProducts(products)

    // reset form
    imagePrevAdd.hidden = true;
    addForm.reset();

    //adding succes msg
    const p = document.createElement("p")
    p.classList.add("success_msg")
    p.textContent = "Product added successfully...";
    addForm.append(p)

    setTimeout(() => {
        p.remove();
        modalOverlay.classList.remove("active")
    }, 2000)

}

function handleEditPreview() {

    // console.dir(inputAddImg)
    const file = inputEditImg.files[0];

    // console.log(file)

    const localURL = URL.createObjectURL(file);

    imagePrevEdit.src = localURL;
    imagePrevEdit.hidden = false;


}

function validateProductUpdation(formData) {
    console.log("orginal: ", currentEditingData);
    console.log("formData :", formData);

    let updatedData = {};

    /****originalData****/
    const {
        title: origTitle,
        price: origPrice,
        stock: origStock
    } = currentEditingData;

    updatedData = {...currentEditingData}

    /****formData****/
    let {
        image,
        title,
        price,
        stock
    } = formData;

    const imageSize = image.size;
    price = +(price)
    stock = +(stock)


    // console.log(origTitle + " : " + title)
    // console.log(origPrice + " : " + price)
    // console.log(origStock + " : " + stock)

    // validate image
    console.log(imageSize)
    if(imageSize > 0) {
        console.log("image updated")

        // console.log(image)
        const thumbnail =  URL.createObjectURL(image);
        console.log(thumbnail)

        console.log("before: ", updatedData)

        console.log(updatedData[thumbnail])
        console.log(updatedData.thumbnail)
        updatedData.thumbnail = thumbnail;

        console.log("after: ", updatedData)
    }
 console.log(imageSize)
    

    // compare title
    if(origTitle !== title) {
        console.log("title updated")
    }

    //compare price
    if(origPrice !== price) {
        console.log("price updated")
    }

    //compare price
    if(origStock !== stock){
         console.log("stock updated")
    }


}

function handleEditProductForm(e) {
    e.preventDefault();


    let data =  new FormData(e.target)

    const formData = Object.fromEntries(data.entries());

    // console.log(formData)

    //validate data updated or not
    validateProductUpdation(formData);
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

//reset settings
modalOverlay.addEventListener("click", (e) => {

    const closeTarget = e.target.closest(
        ".modal_close_button, #cancel-button-add, #cancel-button-edit"
    );

    if (closeTarget) {
        modalOverlay.classList.remove("active");
        addFormContent.classList.remove("show_modal")
        editFormContent.classList.remove("show_modal")
        imagePrevAdd.hidden = true;
        imagePrevEdit.hidden = true;
        addForm.reset();
    }
})

// add product events
addForm.addEventListener("submit", handleAddProductForm);
inputAddImg.addEventListener("change", handleAddPreview)


//edit product listner
editForm.addEventListener("submit", handleEditProductForm)
inputEditImg.addEventListener("change", handleEditPreview)
