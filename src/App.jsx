import './App.css'
import {createTheme, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import TemplateMatcherForm from "./components/form/TemplateMatcherForm.jsx";

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {

  return (
      <MantineProvider theme={theme}>
          <TemplateMatcherForm />
      </MantineProvider>
  )
}

export default App
