//Data imports
import { rawOrdersData } from "./utils/rawOrdersData.js";
import { rawUsersData } from "./utils/rawUsersData.js";
import { products } from "./products.js";
import { orders } from "./order.js";

//Storage imports
import { saveUsers } from "./storage/storage.js";
import { loadUsers } from "./storage/storage.js";

//DOM refs
import { appContent } from "./utils/refs.js";


/*----------------States-----------------*/

let users = [];


/*----------------Helpers functions-----------------*/


function createUsersTable(users) {
    // console.log("users : ", users)
    // console.log("orders : ", orders)

    if (users.length === 0) return;

    // console.log(appContent)

    appContent.innerHTML = "";

    appContent.innerHTML = `

                <div class="parent_holder">

                    <div class="parent_container">

                        <div class="row row_five row_header">
                            <div>User</div>
                            <div>Email</div>
                            <div>Orders</div>
                            <div>Joined</div>
                            <div>Status</div>
                        </div>

                        <div class="row_parent order_row_parent">

                            

                        </div>

                    </div>

                </div>    
    `;

    const userParent = document.querySelector(".order_row_parent");

    users.forEach(user => {

        // console.log(user)

        const {
            userId,
            username,
            email,
            joined,
            accountStatus
        } = user;

        const customerDetails = orders.find(item => item.userId === userId)
        const orderCount = customerDetails?.items.length;
       
        const div = document.createElement("div")
        div.classList.add("row", "row_five");
        div.id = userId;

        div.innerHTML = `
            <div class="user_box boxes">${username}</div>
            <div class="email_box boxes">${email}</div>
            <div class="orders_box boxes">${orderCount}</div>
            <div class="joined_box boxes">${joined}</div>
            <div class="user_status_box boxes">${accountStatus}</div>
        `

        userParent.append(div)
    })


}



/*----------------UI functions-----------------*/

function renderUsers(users) {

    createUsersTable(users)
}


/*----------------Data functions-----------------*/

export function handleUsers() {
  

    if (rawUsersData.length === 0) return;

    users = [...rawUsersData];
    // console.log("initial users: ", users)

    //save to localestorage;
    saveUsers(users)

    renderUsers(users)
}
