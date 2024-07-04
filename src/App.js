import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from "./pages/Admin";
import { SnackbarProvider, enqueueSnackbar } from "notistack";




function App() {
  return (
    <div className="App">
      <SnackbarProvider>
      <BrowserRouter install notistackouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
