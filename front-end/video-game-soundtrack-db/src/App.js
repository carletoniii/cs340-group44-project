import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import PageBody from "./components/PageBody";
import HomePage from "./components/Homepage";

function PageBodyWrapper() {
  let { tableName } = useParams();
  tableName = tableName[0].toUpperCase() + tableName.slice(1);
  return <PageBody tableName={tableName} />;
}

export default function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navigation />
        </header>
        <div className="card">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/:tableName" exact element={<PageBodyWrapper />} />
          </Routes>
        </div>
        <footer>© 2023 Rafael Cruz, Carleton Foster</footer>
      </Router>
    </div>
  );
}
