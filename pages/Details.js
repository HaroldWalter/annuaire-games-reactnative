import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Text, Image, View, ScrollView } from "react-native";

export default Details = ({ navigation, route }) => {
	console.log(route.params.slug);

	const slug = route.params.slug;
	const [game, setGame] = useState(null);

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

	const bookmarks = useSelector((state) => state.games);
	const dispatch = useDispatch();

	const handlePressAdd = () => {
		dispatch({
			type: "game/addGame",
			payload: {
				slug: game.slug,
				name: game.name,
				background_image: game.background_image,
				id: game.id,
			},
		});
	};

	const handlePressRemove = () => {
		dispatch({
			type: "game/removeGame",
			payload: game.id,
		});
	};
	// Vérifier si le jeu en cours est dans les bookmarks
	const isBookmarked = () =>
		bookmarks.find((bookmark) => bookmark.id == game.id) !== undefined;

	return (
		<View style={style.page}>

			{game !=null && (<Image source={{ uri: game.background_image }} style={style.bg}></Image>)}
			<ScrollView style={style.overlay}>
				<Text>{game!=null && game.name}</Text>
				<Text>{game!=null && game.description.replace(/<[^>]*>/g, "")}</Text>
				{/* <Text>{game.description}</Text> */}
				<Text>Rating: {game!=null && game.rating}</Text>
			</ScrollView>
			{game != null && isBookmarked() ? (
				<Button title="⭐ Retirer" onPress={handlePressRemove}></Button>
			) : (
				<Button title="⭐ Ajouter" onPress={handlePressAdd}></Button>
			)}
		</View>
	);
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

