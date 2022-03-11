import { createSlice } from '@reduxjs/toolkit';


const timerSlice = createSlice({
    name: 'timer',
    initialState: [],
    reducers: {
        addTimer: (state, action) => {
            const timer = action.payload;
            state.push(timer);
        },
        toggleTimer: (state, action) => {
            state.find(timer => timer.id === action.payload).timerOn = !state.find(timer => timer.id === action.payload).timerOn;
        },
        incrementBySecond: (state, action) => {
            state.find(timer => timer.id === action.payload).time = state.find(timer => timer.id === action.payload).time + 1;
        },
        setLastTimerOffTime: (state, action) => {
            console.log(state[0].id);
            console.log(action.payload);
            state.find(timer => timer.id === action.payload).lastTimerOffTime = state.find(timer => timer.id === action.payload).time;
        }
    }
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;