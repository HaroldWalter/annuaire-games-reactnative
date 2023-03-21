import React, { useState } from "react";
import {
	Button,
	FlatList,
	Image,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
	const [searchText, setSearchText] = useState("");

	const [games, setGames] = useState([]);

	const bookmarks = useSelector((state) => state.games);


	const handleSearch = () => {
		const apiKey = "b1c7381cdcf6480c974e4180affadf92";
		const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(
			searchText
		)}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setGames(data.results);
			})
			.catch(() => {
				alert("Une erreur est survenue");
			});
	};

	const handleClick = (slug) => {
		navigation.push("Details", { slug });
	};


	const isBookmarked = (game) =>
		bookmarks.find((bookmark) => bookmark.id == game.id) !== undefined;

	return (
		<View style={style.page}>
			<View style={style.searchBAr}>
				<TextInput
					style={style.searchInput}
					onChangeText={setSearchText}
					value={searchText}
				></TextInput>
				<Button title="Chercher" onPress={handleSearch}></Button>
			</View>
			<FlatList
				style={style.list}
				data={games}
				renderItem={({ item }) => (
					<Pressable
						onPress={() => {
							handleClick(item.slug);
						}}
					>
						<View style={style.listItem}>
							<Image
								source={{ uri: item.background_image }}
								style={style.listImage}
							></Image>
							<Text>{item.name}</Text>
							<Text>Note: {item.rating}</Text>
							{ isBookmarked(item) ? (
							<FontAwesome name="star" size={15} color="#ffd700" style= {style.star}/>) : (<></>) }
						</View>
					</Pressable>
				)}
				keyExtractor={(item) => item.id}
			></FlatList>
			<Button
				title="Mes jeux"
				onPress={() => {
					navigation.push("Bookmarks");
				}}
			></Button>
		</View>
	);
};

const style = {
	page: {
		flex: 1,
	},
	searchBAr: {
		flexDirection: "row",
	},
	searchInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#dddddd",
	},
	list: {
		flex: 1,
	},
	listItem: {
		backgroundColor: "#e0e0e0",
		margin: 2,
		padding: 15,
		flexDirection: "row",
	},
	listImage: {
		width: 75,
		resizeMode: "center",
		marginRight: 10,
	},

	star : {
		marginLeft: 10,
		paddingTop: 3
	}
};

export default Home;
