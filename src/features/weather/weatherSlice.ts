import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityWeather } from "../../pages/HomePage";
import axios from "axios";

/* TYPES */
interface WeatherState {
    cities: CityWeather[];
    city: CityWeather | null;
    loading: boolean;
}

/*ACTIONS*/
export const getCities = createAsyncThunk("cities/list", async () => {
    const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/group?id=5128581,5391959,4887398&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    return response.data.list as CityWeather[];
});

export const getCity = createAsyncThunk("cities/get", async (city: string) => {
    return await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    ).then((response) => response.data as CityWeather)
        .catch((error) => window.alert("City not found."));
});

export const getCityDetail = createAsyncThunk("city/get", async (id: string) => {
    const response = await axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
    return response.data as CityWeather;
});

/*REDUCER*/
const initialState: WeatherState = {
    cities: [],
    city: null,
    loading: false,
};

const weatherSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCities.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getCities.fulfilled, (state, action) => {
            state.cities = action.payload;
            state.loading = false;
        });
        builder.addCase(getCity.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload)
                state.cities.push(action.payload);
        });
        builder.addCase(getCityDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.city = action.payload;
        });
    },
});

export default weatherSlice.reducer;