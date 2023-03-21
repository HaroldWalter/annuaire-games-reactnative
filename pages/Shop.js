import { useEffect, useState } from "react";
import { Platform, Text, View, StyleProp } from "react-native";
import haversine from "haversine-distance";

import * as Location from "expo-location";

export default Shop = () => {
	const [shop, setShop] = useState(null);

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		const url = `https://www.formacitron.com/gps-api/selection.json`;

		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);

			if (location)
				fetch(url)
					.then((response) => response.json())
					.then((data) => {
						const shopsList = data.map((item) => {
							// console.log(item);
							let shopLocation = {
								latitude: item.gps_lat,
								longitude: item.gps_lng,
							};
							// console.log(shopLocation);
							let yourLocation = {
								latitude: location.coords.latitude,
								longitude: location.coords.longitude,
							};
							// console.log(yourLocation);
							let distance = haversine(shopLocation, yourLocation);
							// console.log(distance);
							return { ...item, distance: distance };
						});

						// console.log(shopsList);

						const ordonnedShopsList = shopsList.sort(
							(a, b) => a.distance - b.distance
						);
						// console.log(ordonnedShopsList);
						data = ordonnedShopsList[0];
						setShop(data);
					})
					.catch(() => {
						alert("Une erreur est survenue");
					});
		})();

		// console.log(shop);
	}, []);

	// let text = "Waiting...";
	// let text2 = "";
	if (errorMsg) {
		return (
			<View style={style.page}>
				<Text>{errorMsg}</Text>
			</View>
		);
	} else if (shop === null && location)
		return (
			<View style={style.page}>
				<Text>En charge ...</Text>
			</View>
		);
	else
		return (
			<View style={style.page}>
				<Text>{shop.name}</Text>
				<Text> Code Postal : {shop.zip_code}</Text>
				<Text>Coordonées : </Text>
				<Text>Latitude : {shop.gps_lat}</Text>
				<Text>Longitude : {shop.gps_lng}</Text>
				{ shop.distance < 1000 ?
				(<Text>Distance : {shop.distance}m</Text>)
				: (<Text>Distance : {(shop.distance/1000).toFixed(1)}km</Text>)
}
			</View>
		);
};

const style = {
	page: {
		flex: 1,
	},
};
