import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from "./components/Header"
import Feature from "./components/MainPic"
import Home from "./pages/Home"
import Save from "./pages/Save"

function App() {
  return (
    <BrowserRouter>
      <div style={{ marginLeft: "80px", marginRight: "80px" }}>
        <Header />
        <Feature />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/save" component={Save}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}


export default App;
