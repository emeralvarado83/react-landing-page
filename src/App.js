import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Releases from './components/Releases';
import Newsletterv2 from './components/Newsletterv2';
import Footer from './components/Footer';
import Unsubscribe from './components/Unsubscribe';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Header/>
        <Routes>
          <Route path='/' element={
            <>
              <Hero/>
              <Releases/>
              <Newsletterv2/>
            </>
          }
          />
          <Route path='/unsubscribe' element={<Unsubscribe/>}></Route>
        </Routes>
        
        <Footer/>
      </div>
    </BrowserRouter>
  );
}
 
export default App;