import { appContent } from "./utils/refs.js"
import { formAppContent } from "./utils/refs.js"
import { adminFormObj } from "./utils/refs.js";

/*

*/


/*----------------Helper functions-----------------*/

function showSettingsUi() {
    formAppContent.style.display = "flex";
}

function validateInputs() {



}


/*----------------Logic functions-----------------*/

export function handleSettings() {

    appContent.style.display = "none";



    // display setting ui
    showSettingsUi();



}


function handleForm(e) {
    e.preventDefault();
    console.log("tap")

    const data = new FormData(adminFormObj.adminForm)

    for (const [key, value] of data.entries()) {
        console.log(key, value);
    }
}

/*----------------Event listeners-----------------*/

adminFormObj.formSubmitBtn.addEventListener("click", handleForm)

