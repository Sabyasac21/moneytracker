import {configureStore, createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'appHandler',
    initialState:{
        showModal:false,
        showExpenseForm: false,
        authorized:false
    },
    reducers:{
        setShowModal: (state, action)=>{
            state.showModal = action.payload
        },
        setShowExpenseForm: (state, action)=>{
            state.showExpenseForm = action.payload
        },
        setAuthorized: (state, action)=>{
            state.authorized = action.payload
        }
    }
})

export const {setShowModal, setShowExpenseForm, setAuthorized} = appSlice.actions;

export const store = configureStore({
    reducer:{
        handleApp: appSlice.reducer
    }
})