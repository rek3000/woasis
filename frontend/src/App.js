import './App.css';
import { RouterProvider } from 'react-router-dom';
import  router  from './routes';
import  { AuthContextProvider } from './routes';

function App() {
  return (
     <AuthContextProvider>
    	<RouterProvider router={router} />
     </AuthContextProvider>
  );
}

export default App;
