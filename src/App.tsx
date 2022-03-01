import Home from "pages";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "redux/store";
import "styles/global.scss";
import "./i18n";

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <div className="App">
            <Home />
          </div>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
