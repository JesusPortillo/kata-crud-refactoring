import React from 'react';
import ListForm from './Components/ListForm.jsx';
import ListList from './Components/ListList.jsx';
import StoreProvider from './Providers/StoreProvider.js';

function App() {
  return <StoreProvider >
    <ListForm />
    <ListList />
  </StoreProvider>
}

export default App;
