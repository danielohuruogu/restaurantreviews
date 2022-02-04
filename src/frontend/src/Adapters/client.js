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

// ******************************
// for the restaurants

// this will be called at the start
export const getAllShops = () =>
    fetch("api/shops")
        .then(checkStatus);

// ******************************
// for the modal shop submission

export const updateShop = shop =>
    fetch("api/shops", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(shop),
    })

export const addNewShop = shop =>
    fetch("api/shops", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(shop)
        }
    ).then(checkStatus)

export const deleteShop = shop =>
	fetch("api/shops", {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'DELETE',
		body: JSON.stringify(shop)
	})


// ******************************
// for the individual shop page
// may not actually be necessary, if the collection comes through with the shop data in the first call
// it should do

export const getAllReviews = review =>
	fetch("api/reviews", {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'GET',
		body: JSON.stringify(review)
	})


export const deleteReview = review =>
	fetch("api/reviews", {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'DELETE',
		body: JSON.stringify(review)
	})

