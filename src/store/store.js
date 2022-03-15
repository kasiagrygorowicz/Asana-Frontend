import { configureStore } from '@reduxjs/toolkit';

import timerReducer from './timer';

const store = configureStore({
    reducer: { timer: timerReducer },
});

export default store;