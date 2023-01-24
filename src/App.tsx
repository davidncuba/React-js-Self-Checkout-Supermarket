import Page from "./components/Page";
import { Container } from "@mui/material";
import Router from "./routes";
import MenuRight from "./components/MenuRight";

function App() {
  return (
    <Page title="Main">
      <Container maxWidth="lg">
        <MenuRight />
        <Router />
      </Container>
    </Page>
  );
}

export default App;
