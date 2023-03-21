import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Bookmarks from "../pages/Bookmark";
import Details from "../pages/Details";
import Home from "../pages/Home";
const Router = () => {
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
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default Router;
