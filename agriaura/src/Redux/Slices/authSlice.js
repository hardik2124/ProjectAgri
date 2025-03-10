import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2E2Zjk5ZDAwOTYxNTRiNDc2MDg3ZTEiLCJpYXQiOjE3MzkwOTE5NTcsImV4cCI6MTczOTA5NTU1N30.UAKClYwpR-6X2VNp2Yf-RkY1J782Dqb-Tqxp4njbn1U",
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    userData: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        Login: (state, value) => {
            state.isAuthenticated = value.payload;
            localStorage.setItem('isAuthenticated', true);
        },
        Logout: (state, value) => {
            state.isAuthenticated = value.payload;
            localStorage.removeItem('isAuthenticated');
        },
        UserData: (state, value) => {
            state.userData = value.payload
        }
    }

});

export const { setSignupData, setLoading, setToken, Login, Logout, UserData } = authSlice.actions;

export default authSlice.reducer;