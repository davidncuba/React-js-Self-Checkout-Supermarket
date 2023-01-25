import {
  AlertColor,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { ProductContextType } from "../../@types/products";
import { ProductContext } from "../../contexts/ProductsContext";
import { IProducts } from "../../@types/products";
import { SnackBar } from "../SnackBar";
const ProductSearch = () => {
  const { products } = useContext(ProductContext) as ProductContextType;
  const [eanInput, setEanInput] = useState("");
  const [productSearch, setProductSearch] = useState<IProducts[]>([]);
  const [price, setPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [qtdDiscount, setQtdDiscount] = useState(0);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const handleSearch = () => {
    const product = products.filter((p) => p.ean === +eanInput);
    if (product.length > 0) {
      setProductSearch(product);
      setPrice(product[0].price);
      setPriceDiscount(
        product[0].price_promotion ? product[0].price_promotion : 0
      );
      setQtdDiscount(product[0].qtd_promotion ? product[0].qtd_promotion : 0);
    } else {
      setOpenSnack(true);
      setMessage("Product not found");
      setSeverity("error");
      setEanInput("");
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEanInput(e.target.value);
  };
  const handleSave = () => {
    const product = products.filter((p) => p.ean === +eanInput);
    if (product.length > 0) {
      product[0].price = price;
      product[0].price_promotion = priceDiscount;
      product[0].qtd_promotion = qtdDiscount;
      setEanInput("");
      setProductSearch([]);
      setPrice(0);
      setPriceDiscount(0);
      setQtdDiscount(0);
      setOpenSnack(true);
      setMessage("Product updated");
      setSeverity("success");
    } else {
      setOpenSnack(true);
      setMessage("Product not found");
      setSeverity("error");
      setEanInput("");
    }
  };

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      <Stack>
        <Stack spacing={2} minWidth={30}>
          <TextField
            label="Item To Edit EAN"
            variant="outlined"
            value={eanInput}
            onChange={handleOnChange}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
        {productSearch.length > 0 && (
          <Stack spacing={2} minWidth={30}>
            <Typography variant="subtitle1">
              ID: {productSearch[0].id}
            </Typography>
            <Typography variant="subtitle1">
              Name: {productSearch[0].name}
            </Typography>
            <Typography variant="subtitle1">
              Price Pence:
              <TextField
                hiddenLabel
                variant="filled"
                size="small"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Typography>
            <Typography variant="subtitle1">
              Qtd Promotion:
              <TextField
                hiddenLabel
                variant="filled"
                size="small"
                value={qtdDiscount}
                onChange={(e) => setQtdDiscount(+e.target.value)}
              />
            </Typography>
            <Typography variant="subtitle1">
              Full Price Promotion Pence:
              <TextField
                hiddenLabel
                variant="filled"
                size="small"
                value={priceDiscount}
                onChange={(e) => setPriceDiscount(+e.target.value)}
              />
            </Typography>
            <Button variant="contained" onClick={handleSave} sx={{ mt: 3 }}>
              SAVE
            </Button>
          </Stack>
        )}
      </Stack>
      <SnackBar
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        message={message}
        severity={severity}
      />
    </Grid>
  );
};

export default ProductSearch;
