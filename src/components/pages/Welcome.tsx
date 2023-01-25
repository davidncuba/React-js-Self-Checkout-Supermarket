import { Button, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#f2f6fc" : "#f2f6fc",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

export function Welcome() {
  return (
    <>
      <Stack
        sx={{ mt: 8, mb: 2 }}
        maxWidth="lg"
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
      >
        <Item>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Checkout!
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {"Self service checkout for your local store."}
            {"Press the cart icon to checkout."}
          </Typography>
          <Typography variant="body1">Any Questions ask for help.</Typography>
        </Item>
      </Stack>
      <Stack
        sx={{ mt: 8, mb: 2 }}
        maxWidth="lg"
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
      >
        <Item>
          <Button
            variant="contained"
            component={Link}
            to="/checkout"
            sx={{ width: 500, height: 100, fontSize: 50 }}
          >
            START
            <ShoppingCartIcon sx={{ fontSize: "50px", ml: 3 }} />
          </Button>
        </Item>
      </Stack>
    </>
  );
}
