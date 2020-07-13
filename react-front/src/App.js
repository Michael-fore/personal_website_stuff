import React from 'react';
import Img from './components/image'
import { ThemeProvider, CSSReset } from "@chakra-ui/core"


function App() {
  return (
    <ThemeProvider>
      <CSSReset/>
      <Img/>
    </ThemeProvider>
  );
}

export default App;
