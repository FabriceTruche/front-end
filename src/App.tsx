import React from 'react';
import './App.css';
import {Navbar} from "./containers/Navbar/Navbar";
import {Navbar1} from "./test/Navbar1";
import {ControlsUI} from "./test/ControlsUI";


const App=()=>{
  return (
      <ControlsUI />
  )
}

export default App;




// function AppOriginal() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

