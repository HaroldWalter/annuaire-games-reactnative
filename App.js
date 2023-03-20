import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Home from "./pages/Home";

export default function App() {
	return (
		<View style={styles.container}>
			<Home></Home>
			<StatusBar hidden={true} style="auto" />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
