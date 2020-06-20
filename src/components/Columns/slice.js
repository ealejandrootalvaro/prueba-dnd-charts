import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from 'react-sortable-hoc';

const columnsSlice = createSlice({
    name: 'columns',
    initialState: {
        orderColumns: [],
        repeatedColumns: []
    },
    reducers: {
        setColumns(state, action) {
            state[action.payload.name] = action.payload.columns
        },
        changeColumn(state, action) {
            let list = state[action.payload.name];
            const result = list.map((element) => {
                if (element.id === action.payload.column.id) {
                    return { ...action.payload.column, selected: !action.payload.column.selected }
                } else {
                    return element;
                }
            })
            state[action.payload.name] = result;
        },
        sortColumn(state, action) {
            state[action.payload.name] = arrayMove(state[action.payload.name], action.payload.oldIndex, action.payload.newIndex);
        },
        changeOrderFromColumn(state, action) {
            let list = state[action.payload.name];
            const result = list.map((element) => {
                debugger;
                if (element.id === action.payload.column.id) {
                    return { ...action.payload.column, order: action.payload.order }
                } else {
                    return element;
                }
            });
            state[action.payload.name] = result;
        }
    }
});

const { actions, reducer } = columnsSlice;

export const { setColumns, changeColumn, sortColumn, changeOrderFromColumn } = actions;
export default reducer;