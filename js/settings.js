import { appContent } from "./utils/refs.js"
import { formAppContent } from "./utils/refs.js"
import { adminForm } from "./utils/refs.js";

/*

*/


/*----------------Helper functions-----------------*/

function showSettingsUi() {
    formAppContent.style.display = "flex";
}

function validateInputs(){



}


/*----------------Logic functions-----------------*/

export function handleSettings() {

    appContent.style.display = "none";



    // display setting ui
    showSettingsUi();



}


function handleForm(e) {
    e.preventDefault();

    console.log(adminForm.formImg.value)

    // const name = adminForm.formName.value;
    const name = adminForm.formName.value;
}

/*----------------Event listeners-----------------*/

adminForm.formSubmitBtn.addEventListener("click", handleForm)

