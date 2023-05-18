import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    menuList: [],
    categoryList: [],
    addedProductList: [],
    isAdmin: false
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateMenu: (state, action) => {
            state.menuList = action.payload
        },
        updateCategory: (state, action) => {
            state.categoryList = action.payload
        },
        checkAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
        addProductList: (state, action) => {
            if (state.addedProductList.some(el => el._id === action.payload._id)) {
                state.addedProductList = state.addedProductList.map(el => {
                    if (el.id === action.payload.id) {
                        return {...el, count: el.count + 1}
                    } else {
                        return el
                    }
                })
            } else {
                state.addedProductList = [...state.addedProductList, {...action.payload, count: 1}]
            }
        },
        deleteProductList: (state, action) => {
            if (state.addedProductList.some(el => el._id === action.payload._id)) {
                const item = state.addedProductList.find(el => el._id === action.payload._id)
                if(item.count - 1 > 0){
                    state.addedProductList = state.addedProductList.map(el => {
                        if (el._id === action.payload._id) {
                            if (el.count - 1 >= 0) {
                                return {...el, count: el.count - 1}
                            }
                        } else {
                            return el
                        }
                    })
                } else {
                    state.addedProductList = state.addedProductList.filter(el => el._id !== action.payload._id)
                }
            }
        },
    }
})

export const {updateMenu, updateCategory, checkAdmin, addProductList, deleteProductList} = menuSlice.actions;

export const MenuReduser = menuSlice.reducer;