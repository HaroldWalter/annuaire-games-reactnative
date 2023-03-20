import React, { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
const Home = () => {
	const [games, setGames] = useState([
		{ id: 1, name: "Jeux 1", rating: 4.6 },
		{ id: 2, name: "Jeux 2", rating: 3.5 },
		{ id: 3, name: "Jeux 3", rating: 4.2 },
		{ id: 4, name: "Jeux 4", rating: 1.5 },
		{ id: 5, name: "Jeux 5", rating: 3.7 },
		{ id: 6, name: "Jeux 6", rating: 5 },
	]);

	return (
		<View style={style.page}>
		<View style={style.searchBAr}>
			<TextInput style={style.searchInput}></TextInput>
			<Button title="Chercher"></Button>
		</View>
		<FlatList style={style.list} data={games} renderItem={ ({item}) => (
			<View style={style.listItem}>
				<Text>{item.name}</Text>
				<Text>Note: {item.rating}</Text>
			</View>
		)} keyExtractor={(item) => item.id}>

		</FlatList>
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
		flex:1,
	},
	listItem: {
		backgroundColor: '#e0e0e0',
		margin:2,
		padding: 15,
	}
};

export default Home;
