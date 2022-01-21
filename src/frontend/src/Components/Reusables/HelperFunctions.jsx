
export function StringifyArray(data) {
	var string = "";

    for (let i=0; i < data.length; i++){
        if (i === data.length-1) {
            string += data[i]
        } else {
            type_food_string += data[i] + ", ";
        }
    }
    return type_food_string
}