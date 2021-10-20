import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement
);
