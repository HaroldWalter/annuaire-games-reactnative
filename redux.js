import { createSlice, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const save = (bookmarks) => {
	AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks))
		.then(() => {
			console.log("Sauvegarde ok");
		})
		.catch((err) => {
			console.log(err.message);
		});
};

const gameSlices = createSlice({
	name: "game",
	initialState: [
		{
			slug: "super-mario-kart",
			name: "Super Mario Kart",
			background_image:
				"https://media.rawg.io/media/games/4da/4da63441cb94d7adb4d954871b65db30.jpg",
			id: 24478,
		},
		{
			slug: "super-mario-bros",
			name: "Super Mario Bros.",
			background_image:
				"https://media.rawg.io/media/games/154/154fea9689109f26c49c6a2db6263ef9.jpg",
			id: 25080,
		},
	],
	reducers: {
		addGame: (state, action) => {
			state.push(action.payload);
			// save(state);
			return state;
		},
		removeGame: (state, action) => {
			// console.log(state);
			// console.log(action.payload);
			const newState = state.filter((item) => item.id !== action.payload);
			// console.log(newState);
			state = newState;
			save(state);
			return state;
		},

		replaceAll: (state, action) => {
			state = action.payload;
			return state;
		},
	},
});

export const store = configureStore({
	reducer: {
		games: gameSlices.reducer,
	},
});
