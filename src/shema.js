import * as yup from "yup";
let messages = [];
let messageQuality = [];
var ageRegex = new RegExp("/(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/");
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

export const Schema = yup.object().shape({
    email: yup
        .string()
        .email("Email is not valid")
        .required("Email is required")
        .matches(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
            "Email is not valid"
        ),
    password: yup
        .string()
        .required("Password is required")
        // .matches(
        //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        //     "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        // )
        .test("passwordValidation", messageQuality, function (value) {
            passwordValidation(value);
            messageQuality = []
        }),
    confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref('password'), null], 'Passwords does not match'),
    age: yup
        .string()
        .test("ageCheck", messages, function (value) {
            ageCheck(value);
            messages = []
        })
})

///////////////////////////////////////////////////////////////////////////
// Age validation
let ageCheck = (value) => {
    if (ageRegex.test(value)) {
        console.log("yoxladi: " + value);
        let parts = value.split("/");
        let dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
        let dtCurrent = new Date();

        if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
            messages.push("Eligibility 18 years only");
        } else if (dtCurrent.getFullYear() - dtDOB.getFullYear() === 18) {
            if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                ///////////////////////////////////////////////////
                // how many MONTH to 18 years old
                let month = dtDOB.getMonth() - dtCurrent.getMonth();
                messages.push("Eligibility 18 years only");
            } else if (dtCurrent.getMonth() === dtDOB.getMonth()) {
                ///////////////////////////////////////////////////
                // how many DAYS to 18 years old
                if (dtCurrent.getDate() < dtDOB.getDate()) {
                    let day = dtDOB.getDate() - dtCurrent.getDate();
                    messages.push("Eligibility 18 years only");
                }
            }
        }

    } else {
        console.log("yoxlamadi: " + value);
        messages.push("Enter date in dd/MM/yyyy format ONLY.");
    }
}

///////////////////////////////////////////////////////////////////////////
// Password validation
let passwordValidation = (value) => {
    if (strongRegex.test(value)) {
        messageQuality.push("Strong password")
    } else if (mediumRegex.test(value)) {
        messageQuality.push("Medium password")
    } else {
        messageQuality.push("Week password")
    }
}