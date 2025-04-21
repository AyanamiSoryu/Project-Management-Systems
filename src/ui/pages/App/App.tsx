// import '../../../assets/fonts/fonts.css';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { memo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Header from '../../pure-components/Header/Header';
import BoardPage from '../Board/Board-page';
import Boards from '../Boards/Boards';
import Issues from '../Issues/Issues';

export interface AppProps {}

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f2f2f' // зеленый AppBar вместо синего
    }
  }
});

const App: React.FC<AppProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Header />
          <Container>
            <Routes>
              <Route path='/' element={<Navigate to='/issues' />} />
              <Route path='/boards' element={<Boards />} />
              <Route path='/board/:id' element={<BoardPage />} />
              <Route path='/issues' element={<Issues />} />
              <Route path='*' element={<Navigate to='/issues' />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default memo(App);
