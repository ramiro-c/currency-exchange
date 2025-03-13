import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import { CurrencyProvider } from "./providers/CurrencyProvider";

function App() {
  return (
    <main>
      <Header />
      <CurrencyProvider>
        <Content />
      </CurrencyProvider>
    </main>
  );
}

export default App;
