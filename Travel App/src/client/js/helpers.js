// calculate number of days between two dates on the form yy-mm-dd
const calculateDateDuration = (start, end) => {
    const diff = Math.abs(getDate(end) - getDate(start))
    return Math.round(diff / (24 * 60 * 60 * 1000))
}

// get date object from the string date on the form yy-mm-dd
const getDate = (date) => {
    const dateParts = date.split('-');
    return new Date(dateParts[0], dateParts[1], dateParts[2]);
}

const getTodayDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return year + "-" + month + "-" + day;
}

const endAfterStart = (start,end) => {
    return getDate(end) - getDate(start) >= 0
}

export {
    getDate,
    getTodayDate,
    calculateDateDuration,
    endAfterStart
}