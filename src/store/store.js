import {combineReducers, configureStore, createStore} from '@reduxjs/toolkit';

import timerReducer from './timer';
import assigneeReducer from './assignee';

const rootReducers = combineReducers({timer: timerReducer, assignee: assigneeReducer})

// const store = configureStore({
//     reducer: { timer: timerReducer },
// });

const store = createStore(rootReducers);

export default store;