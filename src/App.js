import "./App.css";
import { GlobalProvider } from "./Global/GlobalState";
import Routes from "./Routers/Routers";

function App() {
  return (
    <div className="h-full w-full bg-gray-200 text-gray-800 dark:text-gray-100 dark:bg-gray-900 font-sans">
      <GlobalProvider>
        <Routes />
      </GlobalProvider>
    </div>
  );
}

export default App;
