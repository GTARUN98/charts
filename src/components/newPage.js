
import React, { useMemo, useState, StrictMode } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  DateFilterModule,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ContextMenuModule,
  MultiFilterModule,
  SetFilterModule,
} from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnMenuModule,
  ContextMenuModule,
  MultiFilterModule,
  SetFilterModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);
import { useFetchJson } from "./useFetchJson";

export default function filterParams  {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    const dateAsString = cellValue;
    if (dateAsString == null) return -1;
    const dateParts = dateAsString.split("/");
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    { field: "age", filter: "agNumberColumnFilter", maxWidth: 100 },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
    },
    { field: "country", filter: "agSetColumnFilter" },
    { field: "sport", filter: "agMultiColumnFilter" },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
    { field: "total", filter: false },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const { data, loading } = useFetchJson(
    "https://www.ag-grid.com/example-assets/olympic-winners.json",
  );

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          rowData={data}
          loading={loading}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

