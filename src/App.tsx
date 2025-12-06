import React from 'react';
import './App.css';
import {Menu, MenuItem} from "./widgets/Menu/Menu";
import {MxMenu} from "./test/widgets/MxMenu";
import {myMenu} from "./test/widgets/TestMenu";
import {allTests} from "./test/AllTests";

const App=()=>{
  return (
      <div>
        {/*<Menu items={allTests} />*/}
        <MxMenu />
      </div>
  )
}

export default App;
