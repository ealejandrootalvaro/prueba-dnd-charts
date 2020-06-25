import React, { useState, useEffect, useContext } from "react";

import { MdDone } from "react-icons/md";

import theme from '../../context/theme';

/**
 * 
 * @param {columns} array Listado de columnas a renderizar
 * @param {onClick} function Notifica al componente padre de un click en la columna 
 */
export default function SelectColumns({ columns, onClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Filtrar las columnas teniendo en cuenta el input de busqueda
  useEffect(() => {
    setSearchResults(
      columns.filter((column) =>
        column.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, columns]);

  const themeValues = useContext(theme);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Buscar columna"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          aria-label="filter-columns"
          style={{marginBottom: '5px', backgroundColor: themeValues.primaryColor}}
        />
      </div>
      <div className="col-12" style={{ maxHeight: "10%", overflow: "auto" }}>
        {searchResults.map((column) => (
          <div data-testid="column-row" key={column.id} className="row columns-pointer" style={{padding: '5px', marginBottom: '5px', backgroundColor: column.selected ? themeValues.primaryColor : themeValues.backgroundColor}} onClick={() => onClick(column)}>
              <div className="col-1 px-0" style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                {column.selected && <MdDone />}
              </div>
              <div className="col-11">{column.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
