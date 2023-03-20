import React, { useState } from "react";
import { Button, FlatList, Image, Text, TextInput, View } from "react-native";
const Home = () => {
	const [searchText, setSearchText] = useState("");

	const [games, setGames] = useState([]);

	const handleSearch = () => {
		const apiKey = 'b1c7381cdcf6480c974e4180affadf92';
		const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setGames(data.results);
			})
			.catch(() => {
				alert("Une erreur est survenue");
			});
	};

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
					<View style={style.listItem}>
						<Image source={{uri: item.background_image}} style={style.listImage}></Image>
						<Text>{item.name}</Text>
						<Text>Note: {item.rating}</Text>
					</View>
				)}
				keyExtractor={(item) => item.id}
			></FlatList>
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
		flexDirection : "row"
	},
	listImage: { 
		width: 75,
		resizeMode: 'center',
		marginRight:10
	}

};

export default Home;
