import { adminForm, formSubmitBtn, formAppContent, appContent, formErrMsg } from "./utils/refs.js";

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
        return {
            success: false,
            errorMsg: "Please select an image..."
        }
    }

    const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    if (!allowedImageTypes.includes(formData.image.type)) {
        return {
            success: false,
            errorMsg: "Only JPG, PNG and WEBP images are allowed."
        }
    }

    if (formData.image.size > 5 * 1024 * 1024) {
        return {
            success: false,
            errorMsg: "Image must be less than 5MB."
        }
    }

    //validate name
    const allowedName = /^[A-Za-z][A-Za-z\s]{1,49}$/;

    const isNameValid = allowedName.test(formData.name.trim())

    if (!formData.name.trim()) {
        return {
            success: false,
            errorMsg: "Name is required."
        };
    }

    if (!isNameValid) {
        return {
            success: false,
            errorMsg: "Name can contain only letters and spaces."
        }
    }

    //validate email
    const allowedEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = allowedEmail.test(formData.email.trim())

    if (!formData.email.trim()) {
        return {
            success: false,
            errorMsg: "Email is required."
        };
    }

    if (!isEmailValid) {
        return {
            success: false,
            errorMsg: "Please enter a valid email address."
        }
    }

    //validate password
    const allowedPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isPasswordValid = allowedPassword.test(formData.password.trim())

    if (!formData.password.trim()) {
        return {
            success: false,
            errorMsg: "Password is required."
        };
    }

    if (!isPasswordValid) {
        return {
            success: false,
            errorMsg: "Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character."
        }
    }


    return {
        success: true,
        errorMsg: "Settings saved successfully"
    };

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
    const result = validateInputs(formData);
    console.log(result)

    if (!result.success) {
        formErrMsg.textContent = result.errorMsg;
        formErrMsg.style.display = "block";
        return;
    }

    console.log("success")

    formErrMsg.textContent = result.errorMsg;
    formErrMsg.classList.add("success");
    formErrMsg.style.display = "block";

    setTimeout(() => {
         formErrMsg.style.display = "none";
    }, 2000)


}

/*----------------Event listeners-----------------*/

formSubmitBtn.addEventListener("click", handleForm)

