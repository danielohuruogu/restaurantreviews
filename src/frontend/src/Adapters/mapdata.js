let data =
[
    {
        id: 1,
        name: "KFC Beckton",
        address: "Unit 6, Gateway Retail Park, 8 Claps Gate Ln, Beckton E6 6LG",
        postcode: "E6 6LG",
        ave_rating: 4,
        type_of_food: ["takeaway", "fast food", "chicken"],
        geometry: {
            location: {
                lat: 51.5217103,
                lng: 0.0699351
            },
        },
        reviews: [
            {
                author: "Big Chungus",
                title: "Was good",
                body: "Went after football, hit the spot. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet dapibus sem, vel molestie nisi fermentum sed. Duis sodales laoreet ligula a vestibulum. Aliquam erat erat, ultrices ac dui a, iaculis aliquet erat. Duis tincidunt quis ipsum vitae vulputate. Praesent eu eros a mi finibus molestie auctor et libero. Phasellus aliquet sem a ligula volutpat, vel egestas nulla posuere. Morbi eget ante mauris. Pellentesque ornare vel sapien quis elementum. Nunc arcu magna, tincidunt eu aliquam sit amet, gravida eget sapien. Pellentesque eu arcu in diam dapibus placerat ac et ex. Proin euismod est dignissim, fermentum lectus nec, fermentum felis. Fusce dapibus convallis eros. Nam rutrum facilisis ipsum sit amet mollis.",
                keywords: ["satisfied", "good", "contenteted"],
                date_made: 2021-11-23,
                rating: 5
            },
            {
                author: "Joe Nathan",
                title: "Was decent",
                body: "Went when I burnt my dinner, was OK",
                keywords:["decent","crispy skin","good chicken"],
                date_made: 2021-11-23,
                rating: 3
            }
        ]
    },
    {
        id: 2,
        name: "Creams Beckton",
        address: "Unit 4B, Gateway Retail Park, 8 Claps Gate Ln, London E6 6LG",
        postcode: "E6 6LG",
        ave_rating: 3,
        type_of_food: ["desserts", "fast food", "cakes"],
        geometry: {
            location: {
                lat: 51.521283,
                lng: 0.0687208
            },
        },
        reviews: [
            {
                author: "Alex Ferguson",
                title: "Was alright",
                body: "Hella sugary",
                keywords: ["sweet", "colourful"],
                date_made: 2021-11-23,
                rating: 2
            },
            {
                author: "Donald Trump",
                title: "Was decent",
                body: "Went when I burnt my dinner, was OK",
                keywords: ["decent"],
                date_made: 2021-12-25,
                rating: 4
            }
        ]
    },
    {
        id: 3,
        name: "McDonalds Gallions Reach",
        address: "Armada Wy., London E6 7ER",
        postcode: "E6 7ER",
        ave_rating: 5,
        type_of_food: ["takeaway", "fast food", "tasty"],
        geometry: {
            location: {
                lat: 51.5160856,
                lng: 0.0754667
            },
        },
        reviews: [
            {
                author: "Daniel Schaniel",
                title: "Banging",
                body: "Bosswoman even gave me extra free fries",
                keywords: ["friendly", "good value", "bosswoman"],
                date_made: 2021-12-25,
                rating: 5
            },
            {
                author: "Jin Kazama",
                title: "Banging again",
                body: "7 golden letters",
                keywords: ["perfect","great","King of Iron Fist Restaurants","This is reality"],
                date_made: 2021-11-23,
                rating: 5
            }
        ]
    }
];

export function getData() {
	return data;
}

export function getSingleData(number) {
	return data.find(
		restaurant => restaurant.id === number
	);
}