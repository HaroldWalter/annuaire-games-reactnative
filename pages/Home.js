import React from "react";
import { Button, TextInput, View } from "react-native";
const Home = () => {
	return (
		<View style={style.searchBAr}>
			<TextInput style={style.searchInput}></TextInput>
			<Button title="Chercher"></Button>
		</View>
	);
};

const style = {
"searchBAr":{
	flexDirection:"row",
},
"searchInput":{
	flex: 1,
	borderWidth: 1,
	borderColor: "#dddddd"
}
}

export default Home;
