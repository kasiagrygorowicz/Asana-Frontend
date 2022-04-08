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
            state.find(timer => timer.id === action.payload).lastTimerOffTime = state.find(timer => timer.id === action.payload).time;
        },
        resetTime: (state, action) => {
            state.find(timer => timer.id === action.payload).time = 0;
        },
        setTime: (state, action) => {
            state.find(timer => timer.id === action.payload.taskId).time = action.payload.timeValue;
        },
        getTimer: (state, action) => {
            return state.find(timer => timer.id === action.payload);
        }
    }
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;