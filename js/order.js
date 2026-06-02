//Data imports
import { rawOrdersData } from "./utils/rawOrdersData.js";
import { rawUsersData } from "./utils/rawUsersData.js";
import { products } from "./products.js";

//Storage imports
import { saveOrders } from "./storage.js";
import { loadOrders } from "./storage.js";

//DOM refs
import { appContent } from "./refs.js";

// Modals
import {
    orderModal,
    modalOverlay,
} from "./refs.js";


/*----------------States-----------------*/

let orders = [];



/*----------------Helpers functions-----------------*/

/* 
ye fn output dega ek object with required details
*/
function normaliseData(rawOrdersData, rawUsersData) {
    // console.log("rawOrdersData: ", rawOrdersData)
    // console.log("rawUsersData: ", rawUsersData)

    if (rawOrdersData.length === 0 || rawUsersData.length === 0) return;

    let tempResult = [];

    rawOrdersData.forEach(order => {
        // console.log(order)


        let target = rawUsersData.find(customer => customer.userId === order.userId)
        // console.log(target.username)
        const customerName = target?.username || "Unknown User";


        const {
            userId,
            orderId,
            items,
            date,
            payment,
            status,
            total
        } = order;

        tempResult.push({
            userId,
            customerName,
            orderId,
            items,
            date,
            payment,
            status,
            total
        })

    })

    // console.log(tempResult)

    return tempResult;


}


function createOrdersTable(orders) {
    // console.log(orders)

    if (orders.length === 0) return;

    // console.log(appContent)

    appContent.innerHTML = "";

    appContent.innerHTML = `

                <div class="parent_holder">

                    <div class="parent_container">

                        <div class="row row_six row_header">
                            <div>OrderID</div>
                            <div>Customer</div>
                            <div>Date</div>
                            <div>Total (Rs)</div>
                            <div>Status</div>
                            <div>Actions</div>
                        </div>

                        <div class="row_parent order_row_parent">

                            

                        </div>

                    </div>

                </div>    
    `;

    const orderParent = document.querySelector(".order_row_parent");

    orders.forEach(order => {

        // console.log(order)

        const {
            userId,
            orderId,
            customerName,
            date,
            total,
            status
        } = order

        const div = document.createElement("div")
        div.classList.add("row", "row_six");
        div.id = userId;

        div.innerHTML = `
            <div class="order_id_box boxes">${orderId}</div>
            <div class="cutomer_box boxes">${customerName}</div>
            <div class="date_box boxes">${date}</div>
            <div class="total_box boxes">${total}</div>
            <div class="status_box boxes">${status}</div>
            <div class="view_box boxes">
                <button class="order_view_button view_btn">View</button>
            </div>
        `

        orderParent.append(div)
    })


}



/*----------------UI functions-----------------*/

function renderOrders(orders) {

    createOrdersTable(orders)
}

function  displayOrderDetails(item){

    console.log(products)
    console.log(item)

    console.log(orderModal)

    orderModal.customerName.textContent = item.customerName;
    orderModal.orderDate.textContent = item.date;
    orderModal.paymentStatus.textContent = item.payment;
    orderModal.orderTotal.textContent = item.total;

    //prdducts


}


/*----------------Data functions-----------------*/

function handleOrderDetails(id, orders) {
    // console.log(id, orders)

    if(!id || orders.length === 0) return;

    const targetOrder = orders.find(item => item.userId === id);
    // console.log(targetOrder)

    displayOrderDetails(targetOrder)

    
}

function handleView(e) {

    // console.log(e.target)

    const viewBtn = e.target.closest(".order_view_button")
    
    if (viewBtn) {
        // console.log("viewbutton tapped")
        
        const parent = viewBtn.closest(".row_six")
        // console.log(parent.id)
        const id = Number(parent.id);
        handleOrderDetails(id, orders)
        modalOverlay.classList.add("active")

    }
}

export function handleOrders() {

    const result = normaliseData(rawOrdersData, rawUsersData)

    if (result.length === 0) return;

    orders = [...result];
    // console.log("initial orders: ", orders)

    //save to localestorage;
    saveOrders(orders)

    renderOrders(orders)

}





/*----------------Event listeners-----------------*/

appContent.addEventListener("click", handleView)