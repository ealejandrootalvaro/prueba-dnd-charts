import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Column from './Column';
import SelectColumns from "./SelectColumns";
import { sortColumn, changeOrderFromColumn } from './slice';

import { listName as nameRepeatedColumns } from './index';

import theme from "../../context/theme";

const listName = "orderColumns";

function detailRepeatedColumns(columns) {
    return columns.reduce((acc, column) => {
        acc += `${column.text} \n`;
        return acc;
    }, "Columnas repetidas: \n");
}

function detailOrderColumns(columns) {
    return columns.reduce((acc, column) => {
        acc += `${column.text} orden: ${column.order ? column.order : 'asc'}\n`;
        return acc;
    }, "Orden columnas seleccionadas: \n");
}


function printDetail(repeatedColumns, orderedColumns) {
    alert(`${detailRepeatedColumns(repeatedColumns)}\n${detailOrderColumns(orderedColumns)}`);
}

export default function Sortable({initialColumns}) {
  const themeValues = useContext(theme);

  const selectedColumns = useSelector((state) =>
    state.columns[listName].filter((column) => column.selected)
  );

  const selectedRepeatedColumns = useSelector(state => 
    state.columns[nameRepeatedColumns].filter((column) => column.selected)
  );

  const dispatch = useDispatch();

  function handleDragnDrop(oldIndex, newIndex) {
    dispatch(sortColumn({ name: listName, oldIndex, newIndex }));
  }

  function handleChangeOrder(column, order) {
      dispatch(changeOrderFromColumn({name: listName, column, order}))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          backgroundColor: themeValues.backgroundColor,
          paddingTop: "20px",
        }}
      >
        <h5 className="columns-title">¿Cómo quieres ordenarlos?</h5>
        <div style={{padding: '0 20px 0 20px'}}>
        {selectedColumns.map((column, i) => <Column key={column.id} column={column} index={i} moveColumn={handleDragnDrop} changeOrder={handleChangeOrder} /> ) }
        </div>
        <SelectColumns listName={listName} initialColumns={initialColumns} />

        <div style={{textAlign: 'right', padding: '20px'}}>
            <button className="btn btn-primary" onClick={() => printDetail(selectedRepeatedColumns, selectedColumns)} >OK</button>
        </div>

      </div>
    </DndProvider>
  );
}
