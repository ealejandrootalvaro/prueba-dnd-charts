import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { GrSort } from "react-icons/gr";

/**
 * 
 * @param {column} Object Información de la columna { id: dentificador, text: Descripción }
 * @param {index} number Numero de la columna al interior de la lista
 * @param {moveColumn} Function Realiza el cambio de posición de la columna
 * @param {changeOrder} Function Cambia el ordenamiento de la columna (asc, desc) 
 */
export default function Column({ column, index, moveColumn, changeOrder }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // No hacer cambio cuando el item sea el mismo 
      if (dragIndex === hoverIndex) {
        return;
      }
      /**
       * Detección de colición
       */
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      const clientOffset = monitor.getClientOffset();
      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      /**
       * Solo hacer el cambio cuando al menos la mitad del elemento este pasando la casilla
       */
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
   
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Si pasa esta parte se hace el movimiento
      moveColumn(dragIndex, hoverIndex);
      // Actulizar el item del indice
      item.index = hoverIndex;
    },
  });

  /**
   * Aplicar estilos a la fila que se mueve
   */
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.COLUMN, id: column.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      key={column.id}
      style={{ display: "flex", justifyContent: "space-between", opacity, marginBottom: '10px' }}
    >
      <span>
        <GrSort style={{ marginRight: "5px" }} /> {column.text}
      </span>
      <span>
        <span onClick={() => changeOrder(column, 'asc')} style={{ color: column.order != 'desc' ? '#5A60F3' : '#929292', marginRight: "10px"}}>
            <FaSortAlphaDown />
        </span>
        <span onClick={() => changeOrder(column, 'desc')} style={{ color: column.order == 'desc' ? '#5A60F3' : '#929292'}}>
            <FaSortAlphaDownAlt onClick={() => changeOrder(column.id, 'desc')} />
        </span>
      </span>
    </div>
  );
}
