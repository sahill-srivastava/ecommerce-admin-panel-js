import { adminForm, formSubmitBtn, formAppContent, appContent } from "./utils/refs.js";

/*

*/


/*----------------Helper functions-----------------*/

function showSettingsUi() {
    formAppContent.style.display = "flex";
}

function validateInputs(formData) {

    // console.log(formData);

    //validate image
    if (!formData.image || formData.image.size === 0) {
        alert("Please select an image...")
        return false;
    }

    const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    if (!allowedImageTypes.includes(formData.image.type)) {
        return "Only JPG, PNG and WEBP images are allowed.";
    }

    if (formData.image.size > 5 * 1024 * 1024) {
        return "Image must be less than 5MB.";
    }

    //validate name
    const allowedName = /^[A-Za-z][A-Za-z\s]{1,49}$/;

    const isNameValid = allowedName.test(formData.name.trim())

    if (!isNameValid) {
        return "Invalid Name"
    }

    //validate email
    const allowedEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = allowedEmail.test(formData.email.trim())

    if (!isEmailValid) {
        return "Invalid Email"
    }

    //validate password
    const allowedPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isPasswordValid = allowedPassword.test(formData.password.trim())

    if (!isPasswordValid) {
        return "Invalid Password";
    }


}


/*----------------Logic functions-----------------*/

export function handleSettings() {

    appContent.style.display = "none";



    // display setting ui
    showSettingsUi();



}


function handleForm(e) {
    e.preventDefault();
    // console.log("tap")

    const formData = {}
    const data = new FormData(adminForm);

    for (const [key, value] of data.entries()) {
        // console.log(key, value)
        formData[key] = value;
    }

    // console.log("formData: ", formData)
   const result  = validateInputs(formData);
   console.log(result)

}

/*----------------Event listeners-----------------*/

formSubmitBtn.addEventListener("click", handleForm)

