import './App.scss';
import {Route, Routes} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import NoPage from './pages/NoPage/NoPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import MyBooks from './pages/MyBooks/MyBooks';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/mybooks' element={<MyBooks />} />
        <Route path='*' element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
