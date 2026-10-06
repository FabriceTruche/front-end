import React from 'react';
import './App.css';
import {Menu, MenuItem} from "./components/Menu";
import {MxMenu} from "./test/TestMxMenu";
import {myMenu} from "./test/TestMenu";
import {allTests} from "./test/AllTests";

const App=()=> {
    return (
        <div>
            <Menu items={allTests}/>
            {/*<MxMenu />*/}
        </div>
    )
}

export default App;
