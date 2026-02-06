import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    loginUser} from "../../services/api/user";

export const getUserData = createAsyncThunk("user/getUserData", 
    async () => {
    return await getAllUsers()})

export const loginUserData = createAsyncThunk(
    "user/loginUserData",
    async (payload, { rejectWithValue }) => {
        try {
        const res = await loginUser(payload); 

        localStorage.setItem("token", res.data.token);

        return res; 
        } catch (err) {
        const errorMsg =
            err?.response?.data?.message || err.message || "Login gagal";
        return rejectWithValue(errorMsg);
        }
    }
);

export const createUserData = createAsyncThunk(
    "user/createUserData",
    async (payload, { rejectWithValue }) => {
        try {
        const res = await createUser(payload);
        return res;
        } catch (err) {
        const errorMsg =
            err?.response?.data?.message || err.message || "Terjadi kesalahan server.";
        return rejectWithValue(errorMsg);
        }
    }
    )   

export const updateUserData = createAsyncThunk("user/editUserData", 
    async ({id, payload}) => {
    return await updateUser(id, payload)})

export const deleteUserData = createAsyncThunk("user/deleteUserData", 
    async (id) => {
    await deleteUser(id)
    return id })

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        currentUser: null,
        token: localStorage.getItem("token"),
        isLogin: false,
        status: "idle",
        isLoading : false,
        isError : false,
        error: null,
    },
    reducers : {

    },

    extraReducers : (builder) => {
        builder
    .addCase(loginUserData.pending, (state) => {
        state.status = "loading";
        })
    .addCase(loginUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isLogin = true;
        })
    .addCase(loginUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
    })

    .addCase(getUserData.fulfilled, (state, action) => {
        state.users = action.payload.data;
    })

    .addCase(createUserData.pending, (state) => {
        state.status = "loading";
        })
    .addCase(createUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("data action",action.payload)
        state.users.push(action.payload.data);
        })
    .addCase(createUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        })

    .addCase(updateUserData.pending, (state) => {
            state.isLoading = true;
        })

    .addCase(updateUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;

            // ✅ Update currentUser langsung

            // ✅ (opsional) sync ke users list
            const index = state.users.findIndex(
                (u) => u.user_id === action.payload.data.user_id
            );
            if (index !== -1) {
                state.users[index] = action.payload.data;
            }
        })

    .addCase(updateUserData.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })

    .addCase(deleteUserData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload)})
    },})

export default userSlice.reducer