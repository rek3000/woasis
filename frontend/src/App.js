import './App.css';
import { RouterProvider } from 'react-router-dom';
import  router  from './routes';

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
