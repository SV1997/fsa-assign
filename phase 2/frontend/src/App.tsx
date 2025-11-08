import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { Provider } from "react-redux"
import store from './Store/store';
import { Router } from "./router/Router"
function App() {
  return (
      <AuthProvider>
        <Provider store={store}>
          <RouterProvider router={Router} />
        </Provider>
      </AuthProvider>
  )
}



export default App
