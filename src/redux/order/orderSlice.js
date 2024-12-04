import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
const initialState = {
    carts: [] // thông tin cart
};


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        doAddBookAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity;
            } else {
                carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            //update redux
            state.carts = carts;
            message.success("Sản phẩm đã được thêm vào Giỏ hàng")
        },

    },
    extraReducers: (builder) => {

    },
});

export const { doAddBookAction } = orderSlice.actions;


export default orderSlice.reducer;
