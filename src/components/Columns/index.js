import React, { useContext } from "react";

import SelectColumns from "./SelectColumns";
import Sortable from "./Sortable";

import contextTheme, {
  backgroundColor,
  primaryColor,
} from "../../context/theme";

const { Provider } = contextTheme;

export const listName = "repeatedColumns";

/**
 * 
 * @param {initialColumns} Array Columnas iniciales
 */
export default function Component({initialColumns}) {
  const themeValues = useContext(contextTheme);

  return (
    <div
      className="row"
      style={{ backgroundColor: themeValues.backgroundColor }}
    >
      <div className="col-6 px-0">
        <SelectColumns
          title="¿Qué columnas se repiten?"
          listName={listName}
          initialColumns={initialColumns}
        />
      </div>
      <div className="col-6 px-0">
        <Provider
          value={{
            backgroundColor: primaryColor,
            primaryColor: backgroundColor,
          }}
        >
          <Sortable initialColumns={initialColumns} />
        </Provider>
      </div>
    </div>
  );
}
