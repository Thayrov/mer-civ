import './App.css';
import { Routes, Route, useMatch } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import Home from './views/Home/Home.jsx';
import Store from './views/Store/Store.jsx';
import Contact from './views/Contact/Contact.jsx';
import Nav from './components/Nav/Nav.jsx';
import Favorites from './views/Favorites/Favorites.jsx';

import { ThemeProvider, createTheme } from '@mui/material';
import Detail from './views/Detail/Detail.jsx';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c55d38',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#c55d38',
          },
        },
      },
    },
  },
});
function App() {
  const isDetailPage = useMatch('/Detail/:id');

  return (
    <ThemeProvider theme={theme}>
      <div className=''>
        {isDetailPage ? null : <Nav />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Store' element={<Store />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Favorites' element={<Favorites />} />
          <Route path='/Detail/:id' element={<Detail />} />
        </Routes>

        {isDetailPage ? null : <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
