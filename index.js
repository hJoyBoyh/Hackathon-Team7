const successCallback = (position) => {
    const number = position.coords.longitude;
    const sign = number < 0 ? '-' : '+';
    const numberString = Math.abs(number).toString();
    const firstFiveDigits = numberString.substring(0, 6);
    const result = sign + firstFiveDigits;
    console.log(result)
    return(result);
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);