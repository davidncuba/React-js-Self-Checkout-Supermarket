import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { productsAPI } from "../../api/products";
import Page from "../Page";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "ean",
    headerName: "ean",
    width: 170,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price pence",
    type: "number",
  },
  {
    field: "qtd_promotion",
    headerName: "QTD Promotion",
    type: "number",
    minWidth: 150,
  },
  {
    field: "price_promotion",
    headerName: "Price Promotion",
    type: "number",
    minWidth: 150,
  },
];

export function Products() {
  return (
    <Page title="Products">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={productsAPI}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          checkboxSelection={false}
        />
      </Box>
    </Page>
  );
}
