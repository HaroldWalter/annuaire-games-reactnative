import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Bookmarks from "../pages/Bookmarks";
import Details from "../pages/Details";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
const Router = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		AsyncStorage.getItem("bookmarks").then((bookmarks) => {
			const games = JSON.parse(bookmarks);
			if (bookmarks !== null)
				dispatch({ type: "game/replaceAll", payload: games });
		});
	}, []);

	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Details"
					component={Details}
					options={{ title: "Détails" }}
				/>
				<Stack.Screen
					name="Bookmarks"
					component={Bookmarks}
					options={{ title: "Mes jeux" }}
				/>
				<Stack.Screen
				name="Shop"
				component={Shop}
				options={{title: "Boutiques"}}
				>					
				</Stack.Screen>
			</Stack.Navigator>
			<StatusBar hidden={true} style="auto" />
		</NavigationContainer>
	);
};



export default Router;
