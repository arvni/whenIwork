
const convertNumber = (number) => persianNumber(Intl.NumberFormat().format(Number.parseInt(number)));

const persianNumber = (value) => {
    if (!value)
        return value;
    var arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"],
        persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"],
        englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
        value = value.toString().replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
    }

    return value;
}

const convertDate = (value) => value ? Intl.DateTimeFormat('fa-IR').format(new Date(value)) : null;
const convertTime = (value) => value ? Intl.DateTimeFormat('fa-IR', {
    hour: "numeric",
    minute: "numeric"
}).format(new Date(value)) : null;

const convertDateTime = (value) => value ? Intl.DateTimeFormat('fa-IR', {
    year: "numeric",
    month: "numeric",
    day: "numeric", hour: "numeric",
    minute: "numeric",
}).format(new Date(value)) : null;

const prepareCurrentTimeInString = (addedHours = 0) => {

    return `${getHours(addedHours)}:${getMinutes()}`;
}

const getHours = (addedHours = 0) => {
    let hour = new Date().getHours() + addedHours;
    if (hour >= 24) {
        hour = 0;
    }
    if (hour < 10)
        hour = "0" + hour;
    return hour;
}
const getMinutes = () => {
    let minutes = (new Date()).getMinutes();
    if (minutes < 10)
        minutes = "0" + minutes;
    return minutes;
}

const checkTime = (startTime, endTime) => {
    let startDateTime = new Date(new Date().toDateString() + " " + startTime);
    let endDateTime = new Date(new Date().toDateString() + " " + endTime);
    return startDateTime - endDateTime >= 0;

}



export {
    convertNumber,
    persianNumber,
    convertDate,
    convertTime,
    convertDateTime,
    prepareCurrentTimeInString,
    checkTime
}
