import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={true} />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
