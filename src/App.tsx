import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import { ExchangeProvider } from "./providers/ExchangeProvider";

function App() {
  return (
    <main>
      <Header />
      <ExchangeProvider>
        <Content />
      </ExchangeProvider>
    </main>
  );
}

export default App;
