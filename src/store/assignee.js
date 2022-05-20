import { createSlice } from '@reduxjs/toolkit';


const assigneeSlice = createSlice({
    name: 'assignee',
    initialState: [],
    reducers: {
        addAssignee: (state, action) => {
            const assignee = action.payload;
            state.push(assignee);
        },
        getAssignee: (state, action) => {
            return state.find(assignee => assignee.taskId === action.payload);
        }
    }
});

export const assigneeActions = assigneeSlice.actions;

export default assigneeSlice.reducer;