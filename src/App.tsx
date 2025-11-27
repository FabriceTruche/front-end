import React from 'react';
import './App.css';
import {Navbar} from "./containers/Navbar/Navbar";


const App=()=>{
  return (
      <Navbar>
          <div>Hello</div>
          <div>World</div>
          <div>Fabrice</div>
      </Navbar>
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

