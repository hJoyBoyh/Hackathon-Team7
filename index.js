

const successCallback = (position) => {
    const number = position.coords.longitude;

    // Extract the sign (negative or positive)
    const sign = number < 0 ? '-' : '+';

    // Convert the number to a string
    const numberString = Math.abs(number).toString();

    // Extract the first five digits
    const firstFiveDigits = numberString.substring(0, 6);

    // Concatenate the sign and the first five digits
    const result = sign + firstFiveDigits;

    console.log(result); // Output: "-73.55"
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
