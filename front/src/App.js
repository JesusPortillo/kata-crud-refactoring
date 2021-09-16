import React from 'react';
import Form from './Components/Form.jsx'
import List from './Components/List.jsx';
import StoreProvider from './Providers/StoreProvider.js';

function App() {
  return <StoreProvider >
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
