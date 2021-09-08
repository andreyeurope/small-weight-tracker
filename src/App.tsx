import { Box, CssBaseline } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Home } from "./pages/home/home";

function App() {
  return (
    <Box minHeight="100vh" overflow="visible" bgcolor="#f7f7ff">
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
