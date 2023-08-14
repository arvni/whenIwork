const Regex = {
    phone: /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    password: /^.{6,}$/
}
export const validate = (value, name) => Regex[name].test(value + "");
export const checkPassword = (data, currentNeeded, setError) => {
    let res = true;
    if (!data.current && currentNeeded) {
        setError("current", "Please Enter Current Password");
        res = false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(data.password)) {
        setError("password", "رمز عبور باید حداقل یک حرف کوچک، یک حرف بزرگ، یک رقم، یک کاراکتر خاص و حداقل هشت کاراکتر داشته باشد.")
        res = false;
    }
    if (data.password !== data.password_confirmation) {
        setError("password_confirmation", "password and password Confirmation are not the Same");
        res = false;
    }
    return res;
}
