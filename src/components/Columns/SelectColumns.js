import React, {useContext, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Render from './Render';

import contextTheme from '../../context/theme';

import { setColumns, changeColumn } from './slice';

/**
 * 
 * @param {title} string Titulo de la sección
 * @param {listName} string Nombre de la lista que se actualiza en redux 
 */
export default function Columns({title, listName, initialColumns}) {

    const columns = useSelector(state => state.columns[listName]);

    const dispatch = useDispatch();

    // Llevar los valores iniciales al store de redux
    useEffect(() => {
      dispatch(setColumns({name: listName, columns: initialColumns}));
    }, [initialColumns, listName]);

  
    const value = useContext(contextTheme);

    // Lanzar función que cambia el estado de selección de la columna
    function handleChange(column) {
        dispatch(changeColumn({name: listName, column}));
    }

    return (
        <div style={{backgroundColor: value.backgroundColor}} >
          <div style={{ padding: '20px'}}>
            {title && <h5 className="columns-title" style={{marginBottom: '28px'}}>{title}</h5>}
            <Render columns={columns} onClick={handleChange} />
          </div>
        </div>
    )
}