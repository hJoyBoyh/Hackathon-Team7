

const successCallback = (position) => {
    console.log(position)
    const number = position.coords.longitude;


    const sign = number < 0 ? '-' : '+';

    const positiveNumber = Math.abs(number);


    const numberString = positiveNumber.toString();

    const match = numberString.match(/\d{5}/);


    const result = match ? sign + match[0] : null;

    console.log(result);
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);