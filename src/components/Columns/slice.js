import { createSlice } from '@reduxjs/toolkit';
import arrayMove from 'array-move';

const columnsSlice = createSlice({
    name: 'columns',
    initialState: {
        orderColumns: [],
        repeatedColumns: [],
        defaults: {}
    },
    reducers: {
        // Setea los valores iniciales de las listas
        setColumns(state, action) {
            state[action.payload.name] = action.payload.columns
            state.defaults[action.payload.name] = action.payload.columns
        },
        // Cambia el atributo de ordenamiento de la columna
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
        // Cambia la posición de la columna en la lista
        sortColumn(state, action) {
            state[action.payload.name] = arrayMove(state[action.payload.name], action.payload.oldIndex, action.payload.newIndex);
        },
        // Cambia el atributo de ordenamiento de la lista
        changeOrderFromColumn(state, action) {
            let list = state[action.payload.name];
            const result = list.map((element) => {
                if (element.id === action.payload.column.id) {
                    return { ...action.payload.column, order: action.payload.order }
                } else {
                    return element;
                }
            });
            state[action.payload.name] = result;
        },
        // Regresar a los valores iniciales
        resetInitialValues(state) {
            Object.keys(state.defaults).forEach(key => {
                state[key] = state.defaults[key];
            })
        }
    }
});

const { actions, reducer } = columnsSlice;

export const { setColumns, changeColumn, sortColumn, changeOrderFromColumn, resetInitialValues } = actions;
export default reducer;