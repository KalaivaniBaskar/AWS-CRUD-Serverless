import { useState } from 'react';
import './App.css';
import AddUsers from './Components/AddUsers';
import Users from './Components/Users';
import { Route, Routes } from 'react-router-dom';
import EditUsers from './Components/EditUsers';

function App() {

   const [cUser, setCUser] = useState({});

  return (
    <div className="App"> 
      <Routes>
        <Route path='/' element={<Users setCUser={setCUser}/>}></Route>
        <Route path='/add' element={ <AddUsers />}></Route>
        <Route path='/edit' element={ <EditUsers cUser={cUser} />}></Route>
        <Route path='*'  element={<h2> 404 : Page not found</h2>}></Route>
      </Routes>
    </div>
  );
}

export default App;
// http://kalais-aws-crud-app.s3-website-us-east-1.amazonaws.com/
// command to upload build folder to bucket: 
// aws s3 sync build/ s3://kalais-aws-crud-app