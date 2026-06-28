import { appContent } from "./utils/refs.js"
import { formAppContent } from "./utils/refs.js"


/*----------------Helper functions-----------------*/

function showSettingsUi() {
    formAppContent.style.display = "flex";
}


/*----------------Logic functions-----------------*/

export function handleSettings() {

    appContent.style.display = "none";

    /*
    create form structure 

    */


    // display setting ui
    showSettingsUi();



}