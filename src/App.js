import './App.css';
import CoinPage from './pages/Coin';
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import Home from './pages/home';
import Watchlist from "./pages/Watchlist";
import { BrowserRouter ,Route,Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
