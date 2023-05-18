import { configureStore ,createSlice} from "@reduxjs/toolkit";

const AlertsSlice = createSlice({
    name: "Alerts",
    initialState:{
        display: false,
        message: "",
        variant: ""
    },

    reducers:{
        display: (state,action) =>{
            state.message = action.payload.message;
            state.variant = action.payload.variant;
            state.display = true
        },

        hide: (state) =>{
            state.message = ""
            state.display = false
        }
    }
})
export const {display,hide} = AlertsSlice.actions

const AuthSlice = createSlice({

    name: "Auth",

    initialState:{
        loggedIn: false
    },

    reducers:{
        login: (state) =>{
            state.loggedIn = true
        },
        logout: (state) =>{
            state.loggedIn = false

        }
    }
})
export const {login,logout} = AuthSlice.actions

const NavbarSlice = createSlice({
    name: "Navbar",
    initialState:{
        homeDisabled: false,
        homeColor:"text-light",
        moviesDisabled: false,
        moviesColor:"text-light",
        register: false,
        login: false,
        disabled: false
    },
    reducers:{

        homeClicked: (state) =>{
            state.homeDisabled = true
            state.homeColor = "text-info"
            state.moviesDisabled = false
            state.moviesColor = "text-light"
        },

        movieClicked: (state) => {
            state.homeDisabled = false;
            state.homeColor = "text-light"
            state.moviesDisabled = true; 
            state.moviesColor = "text-info" 
        },
          
        enable: (state) =>{
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.register = false;
            state.login = false;
            state.disabled = false;
            state.moviesColor = "text-light"
            state.homeColor = "text-light"


        },

        enableRegister: (state) =>{
            state.register = true;
            state.homeDisabled = true;
            state.moviesDisabled = true;
            state.disabled = true;
        },

        
        disableRegister: (state) =>{
            state.register = false;
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.disabled = false;
        },

        enableLogin: (state) =>{
            state.login = true;
            state.homeDisabled = true;
            state.moviesDisabled = true;
            state.disabled = true;
        },

        disableLogin: (state) =>{
            state.login = false;
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.disabled = false;
        },

        pageSwitch: (state) =>{
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.disabled = false;
            state.moviesColor = "text-light"
            state.homeColor = "text-light"
        }
    }
})
export const {homeClicked, movieClicked, enable,enableRegister,pageSwitch,disableRegister,enableLogin,disableLogin} = NavbarSlice.actions

export default configureStore({
    reducer: {
        Navbar: NavbarSlice.reducer,
        Alerts: AlertsSlice.reducer,
        Auth: AuthSlice.reducer
    }

});