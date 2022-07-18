// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthorCreate from './pages/AuthorCreate';
import AuthorsList from './pages/AuthorsList';
import AuthorView from './pages/AuthorView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthorsList />} />
        <Route path="/author/view/:id" element={<AuthorView />} />
        <Route path="/author/create" element={<AuthorCreate />} />
      </Routes>
    </div>
  );
}

export default App;
