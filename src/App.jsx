import './App.css'
import {createTheme, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import {RouterProvider} from "react-router-dom";
import {router} from "@/app/router.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {Notifications} from "@mantine/notifications";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

const theme = createTheme({
    primaryColor : "teal",
});

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
              <RouterProvider router={router} />
              <Notifications />
          </MantineProvider>
      </QueryClientProvider>
  )
}

export default App
