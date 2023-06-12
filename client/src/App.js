import {useState} from 'react'
import { addUser } from './api';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Add from './Add';
import Display from './Display';
import TransactionInfo from './TranscationInfo';
function App() {

  
  return (
   <>
      
      <Router>
    
       
          <ul>
           
            <li>
              <Link to="/">Display</Link>
            </li>
            <li>
              <Link to="/add">Add Record</Link>
            </li>
            <li>
              <Link to="/info">Transaction Info</Link>
            </li>
          </ul>
       

        
        <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/" element={<Display />}y />
        <Route path="/info" element={<TransactionInfo />}y />
        </Routes>

   
      </Router>

          
      
   </>
  );
}

export default App;
