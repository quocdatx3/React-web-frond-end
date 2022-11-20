import React from 'react';
import Login from "./component/Login";
import Adminpage from './component/Adminpage';
import useToken from "./component/useToken";
import { BrowserRouter } from 'react-router-dom';


function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <Adminpage />
    </BrowserRouter>
  );
}

export default App;
