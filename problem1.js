const reader = require("readline-sync");

let packages = [];
console.log("Enter Input");
const input1 = reader.question('');
const [ base_delivery_cost_string, no_of_packages ] = input1.trim().split(" ");
const base_delivery_cost = parseInt(base_delivery_cost_string);

const getDiscount = (delivery_cost, offer_code, distance_in_km, pkg_weight_in_kg) => {
	let discount_in_percentage = 0;
	switch(offer_code){
		case 'OFR001':
			if(distance_in_km < 200 && pkg_weight_in_kg >= 70 && pkg_weight_in_kg <= 200)
				discount_in_percentage = 10;
			break;
		case 'OFR002':
			if((distance_in_km >= 50 && distance_in_km <= 150) && (pkg_weight_in_kg >= 100 && pkg_weight_in_kg <= 250))
				discount_in_percentage = 7;
			break;
		case 'OFR003':
			if((distance_in_km >= 50 && distance_in_km <= 250) && (pkg_weight_in_kg >= 10 && pkg_weight_in_kg <= 150))
				discount_in_percentage = 5;
			break;
	}
	return (delivery_cost / 100) * discount_in_percentage;
}

for(i = 0; i < no_of_packages; i++){
	const package = reader.question('');
	let [pkg_id, pkg_weight_in_kg, distance_in_km, offer_code] = package.trim().split(" ");
	pkg_weight_in_kg = parseInt(pkg_weight_in_kg);
	distance_in_km = parseInt(distance_in_km);
	let delivery_cost = base_delivery_cost + (pkg_weight_in_kg * 10) + (distance_in_km * 5);
	let discount = getDiscount(delivery_cost, offer_code, distance_in_km, pkg_weight_in_kg);

	packages.push({
		pkg_id,
		pkg_weight_in_kg,
		distance_in_km,
		offer_code,
		delivery_cost,
		discount,
		total_cost: delivery_cost - discount
	});
}

for(i = 0; i < no_of_packages; i++){
	const { pkg_id, discount, total_cost } = packages[i];
	console.log(pkg_id, discount, total_cost);
}
