import { configureStore } from "@reduxjs/toolkit";
import { MenuReduser } from "./Slices/Menu";

const store = configureStore({
    reducer: {
        menu: MenuReduser,
    },
});

export default store;
