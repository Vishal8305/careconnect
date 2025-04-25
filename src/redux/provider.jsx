import { Provider } from "react-redux";
import { store } from "./app/store";

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
