import React from 'react';
import Editor from './components/editor/editor';
import './App.css';
import ResponsiveAppBar from './components/navbar/navbar';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Editor/>
    </div>
  );
}

export default App;
