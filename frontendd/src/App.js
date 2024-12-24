
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Content from './pages/Content';


function App() {
  const [cartItems, setCartItems] = useState([])

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <Content  cartItems={cartItems} setCartItems={setCartItems}/>
      <Footer />
    </div>
  );
}

export default App;
