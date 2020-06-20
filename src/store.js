import { configureStore } from '@reduxjs/toolkit';

import columnsReducer from './components/Columns/slice';

const store = configureStore({
    reducer: {
        columns: columnsReducer
    }
});

export default store;