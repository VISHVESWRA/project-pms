import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { PrimeReactProvider } from "primereact/api";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={true} />
          <AppRoutes />
        </BrowserRouter>
      </PrimeReactProvider>
    </>
  );
}

export default App;
