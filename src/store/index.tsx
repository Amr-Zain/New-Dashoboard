import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import ProfileReducer from './profile';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    ProfileConfig: ProfileReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
