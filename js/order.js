//Data imports
import { rawOrdersData } from "./utils/rawOrdersData.js";
import { rawUsersData } from "./utils/rawUsersData.js";





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




/*----------------UI functions-----------------*/





/*----------------Data functions-----------------*/

export function handleOrders() {

   const result =  normaliseData(rawOrdersData, rawUsersData)


    orders = [...result];

    console.log("initial orders: ", orders)

}





/*----------------Event listeners-----------------*/