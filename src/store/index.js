import {configureStore} from "@reduxjs/toolkit";
import {articleReducer} from "@/store/article/reducer";
import {userReducer} from "@/store/user/reducer";

const store = configureStore({
    reducer:{
        article:articleReducer,
        user:userReducer
    }
})

export default store;
