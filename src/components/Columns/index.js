import React, { useContext } from "react";

import SelectColumns from "./SelectColumns";
import Sortable from "./Sortable";

import contextTheme, {
  backgroundColor,
  primaryColor,
} from "../../context/theme";

const { Provider } = contextTheme;

export const listName = "repeatedColumns";

const initialColumns = [
  {
    id: 1,
    text: "SKT_ID",
    selected: false,
  },
  {
    id: 2,
    text: "ORDER_ID",
    selected: false,
  },
  {
    id: 3,
    text: "CREATION_DATE",
    selected: false,
  },
  {
    id: 4,
    text: "TOTAL_AMOUNT",
    selected: false,
  },
  {
    id: 5,
    text: "TOTAL_ITEMS",
    selected: false,
  },
  {
    id: 6,
    text: "USER_ID",
    selected: false,
  },
  {
    id: 7,
    text: "GATEWAY_REFERENCE",
    selected: false,
  },
  {
    id: 8,
    text: "STATUS",
    selected: false,
  },
];

export default function Component() {
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
