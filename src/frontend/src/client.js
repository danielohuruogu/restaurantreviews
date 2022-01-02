import fetch from 'unfetch';


// function to check the status after every backend API call
const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // converting non 2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}
// I think get requests are the default and need nothing else to be specified in the headers
// for the restaurants

export const getAllRestaurants = () =>
    fetch("api/restaurants")
        .then(checkStatus);

export cont addNewRestaurant = restaurant =>
    fetch("api/restaurants", {
        headers: {
            'Content-Type': 'application/json'
            },
        method: 'POST',
        body: JSON.stringify(restaurant)
        }
    ).then(checkStatus)

/* locate a restaurant for a review */

//export const searchEstablishment = (address) => {
//	query =
//}

// for the users

export const getAllUsers = () =>
    fetch("api/users")
        .then(checkStatus)

export cont addNewUser = user =>
    fetch("api/users", {
        headers: {
            'Content-Type': 'application/json'
            },
        method: 'POST',
        body: JSON.stringify(user)
        }
    ).then(checkStatus)