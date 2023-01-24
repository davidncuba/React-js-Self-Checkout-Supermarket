import Page from "./components/Page";
import { Container } from "@mui/material";
import Router from "./routes";
import MenuRight from "./components/MenuRight";
import ProductProvider from "./contexts/ProductsContext";

function App() {
  return (
    <ProductProvider>
      <Page title="Main">
        <Container maxWidth="lg">
          <MenuRight />
          <Router />
        </Container>
      </Page>
    </ProductProvider>
  );
}

export default App;
