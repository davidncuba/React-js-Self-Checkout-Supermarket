import Page from "./components/Page";
import { Container } from "@mui/material";
import Router from "./routes";

function App() {
  return (
    <Page title="Main">
      <Container maxWidth="lg">
        <Router />
      </Container>
    </Page>
  );
}

export default App;
