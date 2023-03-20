import { createSlice, configureStore } from "@reduxjs/toolkit";

const gameSlices = createSlice({
   name: 'game',
   initialState: [
      {
         "slug": "super-mario-kart",
         "name": "Super Mario Kart",
         "background_image": 
         "https://media.rawg.io/media/games/4da/4da63441cb94d7adb4d954871b65db30.jpg",
         "id": 24478,
         },
         {
         "slug": "super-mario-bros",
         "name": "Super Mario Bros.",
         "background_image":
         "https://media.rawg.io/media/games/154/154fea9689109f26c49c6a2db6263ef9.jpg",
         "id": 25080,
         }
   ],
   reducers: {
      addGame: (state, action) => { 
         state.push(action.payload);
         return state;
      },
      }
})

export const store = configureStore({
   reducer: {
      games: gameSlices.reducer
   }
})