import { useEffect, useState } from "react";
import { Platform, Text, View, StyleProp } from "react-native";

import * as Location from "expo-location";

export default Shop = () => {
	const [shops, setShops] = useState(null);

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		const url = `https://www.formacitron.com/gps-api/selection.json`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setShops(data);
			})
			.catch(() => {
				alert("Une erreur est survenue");
			});

		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	if (shops === null)
		return (
			<View style={style.page}>
				<Text>Page en chargement</Text>
			</View>
		);
	else
		return (
			<View style={style.page}>
				<Text>{text}</Text>
			</View>
		);
};

const style = {
	page: {
		flex: 1,
	},
};
