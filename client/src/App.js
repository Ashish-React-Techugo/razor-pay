import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/payment-successfull' element={<PaymentSuccess/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
