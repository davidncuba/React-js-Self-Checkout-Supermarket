import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  AlertColor,
} from "@mui/material";
import { useContext, useState } from "react";
import { ProductContextType, IProductsSell } from "../../@types/products";
import { ProductContext } from "../../contexts/ProductsContext";
import { convertPenceToPounds } from "../PenceToPounds";
import { SnackBar } from "../SnackBar";

export const Checkout = () => {
  const { products } = useContext(ProductContext) as ProductContextType;
  const [productAddCheckout, setProductAddCheckout] = useState<IProductsSell[]>(
    []
  );
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [eanInput, setEanInput] = useState("");
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEanInput(e.target.value);
  };
  const handleonKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const product = products.filter((p) => p.ean === +eanInput);
      if (product.length > 0) {
        const productCheckout = productAddCheckout.filter(
          (p) => p.ean === +product[0].ean
        );
        if (productCheckout.length > 0) {
          productCheckout[0].qtd += 1;
          // check if product has promotion
          if (
            product[0].qtd_promotion !== undefined &&
            product[0].qtd_promotion !== null &&
            product[0].price_promotion !== undefined &&
            product[0].price_promotion !== null
          ) {
            // check if qtd is multiple of qtd_promotion
            if (productCheckout[0].qtd % product[0].qtd_promotion === 0) {
              // set discount
              const discountProduct =
                product[0].price * product[0].qtd_promotion -
                product[0].price_promotion;

              productCheckout[0].discount += discountProduct;
              productCheckout[0].price_total +=
                productCheckout[0].price - discountProduct;
              setDiscount(discount + discountProduct);
              setTotal(total + product[0].price - discountProduct);
            } else {
              // set total without discount
              productCheckout[0].price_total += productCheckout[0].price;
              setTotal(total + productCheckout[0].price);
            }
          } else {
            setTotal(
              total + productCheckout[0].price - productCheckout[0].discount
            );
            productCheckout[0].price_total =
              productCheckout[0].qtd * productCheckout[0].price;
          }
          setSubTotal(subTotal + productCheckout[0].price);
        } else {
          const newProductAdd = Object.assign(product[0], {
            qtd: 1,
            price_total: product[0].price,
            discount: 0,
          });
          setSubTotal(subTotal + product[0].price);
          setDiscount(discount + 0);
          setTotal(total + product[0].price);
          setProductAddCheckout([...productAddCheckout, newProductAdd]);
        }

        setEanInput("");
        setOpenSnack(true);
        setMessage("Product added to checkout");
        setSeverity("success");
      } else {
        setOpenSnack(true);
        setMessage("Product not found");
        setSeverity("error");
        setEanInput("");
      }
    }
  };
  const handleClickPayment = () => {
    setProductAddCheckout([]);
    setEanInput("");
    setOpenSnack(true);
    setMessage("Payment completed");
    setSeverity("success");
    setSubTotal(0);
    setDiscount(0);
    setTotal(0);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mt: 2, textAlign: "center" }}>
          Checkout
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="barcode"
          label="Barcode"
          variant="outlined"
          value={eanInput}
          sx={{ minWidth: "100%" }}
          onKeyDown={handleonKeyDown}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productAddCheckout.map((product) => (
                <TableRow key={product.name}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.qtd}</TableCell>
                  <TableCell align="right">
                    £ {convertPenceToPounds(product.price)}
                  </TableCell>
                  <TableCell align="right">
                    £ {convertPenceToPounds(product.discount)}
                  </TableCell>
                  <TableCell align="right">
                    £ {convertPenceToPounds(product.price_total)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  £ {convertPenceToPounds(subTotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Discount</TableCell>
                <TableCell align="right">
                  £ {convertPenceToPounds(discount)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">
                  £ {convertPenceToPounds(total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          sx={{ minWidth: "100%", mt: 2 }}
          onClick={handleClickPayment}
        >
          Payment
        </Button>
      </Grid>
      <SnackBar
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        message={message}
        severity={severity}
      />
    </Grid>
  );
};
