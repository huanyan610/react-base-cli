import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import routes from '@/routes/config';
import RenderRoute from '@/routes/index';

const App = () => {
  return (
    <BrowserRouter>
      <RenderRoute routes={routes}></RenderRoute>
    </BrowserRouter>
  );
};

export default App;
