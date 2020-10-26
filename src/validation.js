export const validation = (value, rules, passwordVal) => {
    let isValid = false;
    let messages = [];
    let messageQuality = [];
    let email_pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    var ageRegex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    // let ageRegex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;

    if (rules.required) {
        ///////////////////////////////////////////////////////////////////////////
        // Email validation
        if (rules.emailVal && email_pattern.test(value)) {
            isValid = true;
        } else if (rules.emailVal) {
            isValid = false;
            messages.push("Email is not valid " + isValid)
        }

        ///////////////////////////////////////////////////////////////////////////
        // Password validation
        if (rules.minLength && value.length > rules.minLength) {
            isValid = true;
        } else if (rules.minLength) {
            isValid = false;
            messages.push("Min length should be " + rules.minLength)
        }

        if (rules.passwordCheck) {
            if (strongRegex.test(value)) {
                messageQuality.push("Strong password")
            } else if (mediumRegex.test(value)) {
                messageQuality.push("Medium password")
            } else {
                messageQuality.push("Week password")
            }
        }

        ///////////////////////////////////////////////////////////////////////////
        // Confirm Password validation
        if (rules.confirmPas && passwordVal === value) {
            isValid = true;
        } else if (rules.confirmPas) {
            isValid = false;
            messages.push("Passwords do not match")
        }

        ///////////////////////////////////////////////////////////////////////////
        // Length if length is 0 validation
        if (value.length === 0) {
            messageQuality = [];
            messages = [];
            messages.push("This field id required!")
        }
    } else {
        ///////////////////////////////////////////////////////////////////////////
        // Age validation
        if (ageRegex.test(value)) {
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
            } else {
                isValid = true;
            }

        } else {
            messages.push("Enter date in dd/MM/yyyy format ONLY.");
        }
    }
    return {
        isValid: isValid,
        messages: messages,
        messageQuality: messageQuality
    }
}