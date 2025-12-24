import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Toaster position="top-right" reverseOrder={true} />
        </div>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
