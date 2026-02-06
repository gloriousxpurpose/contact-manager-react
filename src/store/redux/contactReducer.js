import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContact, 
    createContact, 
    updateContact, 
    deleteContact, getContactById } from "../../services/api/contact";

export const getData = createAsyncThunk("contact/getData", 
    async (params) => {
    return await getContact(params)})

export const createData = createAsyncThunk("contact/createData", 
    async (payload) => {
    return await createContact(payload)})

export const updateData = createAsyncThunk("contact/editData", 
    async ({id, payload}) => {
    return await updateContact(id, payload)})

export const deleteData = createAsyncThunk("contact/deleteData", 
    async (id) => {
    await deleteContact(id)
    return id })

export const getDataById = createAsyncThunk(
    "contact/getContactById",
    async (id, payload) => {
        return await getContactById(id, payload)
    }
)

export const contactSlice = createSlice({
    name : "contact",
    initialState : {
        value : [],
        contactDetail: null,
        isLoading : false,
        isError : false    
    },
    reducers : {},

    extraReducers : (builder) => {
        builder
        .addCase(getData.pending, (state) => {
            state.isLoading = true
            state.isError = false })

        .addCase(getData.fulfilled, (state, action) => {
            state.isLoading = false
            state.value = action.payload })

        .addCase(getData.rejected, (state) => {
            state.isLoading = false
            state.isError = true })

        .addCase(getDataById.pending, (state) => {
        state.isLoading = true
        })
        .addCase(getDataById.fulfilled, (state, action) => {
            state.isLoading = false
            state.contactDetail = action.payload
            console.log("reducerContact: ", action.payload)
        })
        .addCase(getDataById.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })
        .addCase(createData.fulfilled, (state, action) => {
            state.value.push(action.payload)})

        .addCase(updateData.fulfilled, (state, action) => {
        const index = state.value.findIndex(
            item => item.contact_id === action.payload.contact_id
        )
        if (index !== -1) {
            state.value[index] = action.payload
        }
        })

        .addCase(deleteData.fulfilled, (state, action) => {
        state.value = state.value.filter((item) => item.contact_id !== action.payload)})
    },})

export default contactSlice.reducer