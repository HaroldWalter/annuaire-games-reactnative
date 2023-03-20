import { useEffect, useState } from "react";
import { Text, Image, View, ScrollView } from "react-native";

export default Details = ({ navigation, route }) => {
	console.log(route.params.slug);

	const slug = route.params.slug;
	const [game, setGame] = useState({});

	useEffect(() => {
		const apiKey = "b1c7381cdcf6480c974e4180affadf92";
		const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setGame(data);
			})
			.catch(() => {
				alert("Une erreur est survenue");
			});
	}, []);
	if (game == null)
		return (
			<View style={style.page}>
				<Text>Chargement du jeu {route.param.slug}</Text>
			</View>
		);
	else {
		return (
			<View style={style.page}>
				<Image source={{ uri: game.background_image }} style={style.bg}></Image>
				<ScrollView style={style.overlay}>
					<Text>{game.name}</Text>
					<Text>{game.description.replace(/<[^>]*>/g, "")}</Text>
               <Text>Rating: {game.rating}</Text>
				</ScrollView>
         {/* <Text>essai</Text> */}

			</View>
		);
	}
};

const style = {
	page: {
		flex: 1,
		},
	bg: {
		flex: 1,
		resizeMode: "cover",
	},
	overlay: {
		position: "absolute",
		backgroundColor: "rgba(255,255,255,0.75)",
		height: "100%",
		width: "100%",
		padding: 10,
	},
};
