import React, { useEffect } from 'react';
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux";
import Router from './components/Router';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<Router></Router>
		</Provider>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
