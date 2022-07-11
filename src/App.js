// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthorsList from './pages/AuthorsList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthorsList />} />
      </Routes>
    </div>
  );
}

export default App;
