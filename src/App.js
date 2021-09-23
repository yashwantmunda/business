import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Header from './components/Header';
import Form from './components/Form';

import { useState } from 'react';
import BusinessList from './components/BusinessList';

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [searchList, setSearchList] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <Header showForm={setOpenForm} searchData={setSearchList} />
      {openForm && <Form showForm={setOpenForm}/>}
      {!openForm && <BusinessList searchText={searchList}/>}
      <CssBaseline/>
    </ThemeProvider> 
  );
}

export default App;
