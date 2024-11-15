import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Scan from './pages/Scan';
import Resource from './pages/Resources';
import Upload from './pages/Ask';
import Room from './pages/Room/room.js';
import RoomFront from './pages/Room/room_front.js';
import Navbar from './components/Navbar';
// import Main from './pages/home/home_final';

const App = () => {
  return (
    <Router>
      <div className="App">
      <Navbar />
        {/* Navigation or other shared components can go here */}
        <Routes>
          
          <Route path="/" element={<Home />} />
          {/* <Route path="/scan" element={<Scan />} /> */}
          <Route path="/resource" element={<Resource />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/room_front" element={<RoomFront />} />
          <Route path="/room/:roomID" element={<Room />} />
          {/* <Route path ="/main" element={<Main />} /> */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;




// import React, { useState, useEffect, useRef} from "react";
// import "./App.css";
// import axios from "axios";
// import MonacoEditor from 'react-monaco-editor';
// import { Row, Col, Container } from 'react-bootstrap';
// // import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import GptUI from './components/chatGptUI';


// function App() {
//   const [code, setCode] = useState("");
//   const [inputArguments, setInputArguments] = useState("");
//   const [output, setOutput] = useState("Output will be displayed here!");
//   const [selectedLanguage, setSelectedLanguage] = useState("");
  
  

//   const handleSubmit = async () => {
//     const payLoad = {
//             language: selectedLanguage,
//             code,
//             arguments: inputArguments,
//           };
//           // alert(inputArguments);
//           // const {data} = await axios.post("http://localhost:5000/run", payLoad);
      
//           try{
//             const {data} = await axios.post("http://localhost:5000/run", payLoad);
//             const formattedOutput= data.output.replace(/\n/g, '<br/>');
//             setOutput(formattedOutput);
//             // console.log(data.output);
//           }catch(err){
//             console.log(err.response);
//             alert("Error: Please check the console.")
//           }
//         };
    
//       // const handleLanguageChange = (event) => {
//       // setSelectedLanguage(event.target.value);
//       // };
       
//     const Langselector = () =>{
//     const res =  document.getElementById('langselector').value;
//     // console.log(res);
//     if(res==1){
//       setSelectedLanguage('cpp');
//       setCode(`#include <stdio.h>
//         int main() {
//               printf("Hello World");
//               return 0;
//                   }`);
//     }
//     if(res==2){
//       setSelectedLanguage('javascript');
//       setCode("");
//     } 
//     if(res==3){
//       setSelectedLanguage('python');
//       setCode("");
//     }

    
//   }
//   // console.log(selectedLanguage);
//   return (
//     <Container style={{ border:"1px solid #000000", maxWidth: "100%", margin: "0px"}}>
//       <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Online Compiler</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//              <Nav.Link href="./">Home</Nav.Link> 
//             <Nav.Link href="#link">Link</Nav.Link>
//             {/* <NavDropdown id="basic-nav-dropdown" onChange={handleLanguageChange}>
//               <NavDropdown.Item  value="cpp" >C</NavDropdown.Item>
//               <NavDropdown.Item  value="javascript" >JavaScript</NavDropdown.Item>
//               <NavDropdown.Item  value="python" >Python</NavDropdown.Item>
//               <NavDropdown.Item  value="java">Java</NavDropdown.Item>
//             </NavDropdown> */}
//                 <Form.Select aria-label="Default select example" id="langselector" onChange={Langselector}>
//                 <option value="0">--select--</option>
//                 <option value="1">C</option>
//                 <option value="2">javascript</option>
//                 <option value="3">Python</option>
//                 </Form.Select>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>

//         <GptUI />
//     {/* <div className="App"> */}
//       {/* <select>
//             className="select"
//             value={selectedLanguage}
//             onChange={handleLanguageChange}>
//               <option value="c">C</option>
//               <option value="javascript">JavaScript</option>
//       </select> */}
//       {/* Replace the textarea with MonacoEditor */}
//       {/* <div class="row"> */}
//       <Row >
//         <div className="col-lg-12 col-sm-12 col-md-12" >
//         <MonacoEditor 
//         height="500px"
//         width="100%"
//        // Set the desired height
//         language={selectedLanguage}
//         theme="hc-black"
//         value={code}
        
//         options={{
//           selectOnLineNumbers: true,
//         }}
//         onChange={(newValue) => {
//           setCode(newValue);
//         }}
        
//       />
//         </div>
//         <div className="col-lg-12 col-md-12 col-sm-12">
//           <h3> Input data: </h3>
//           <textarea className="h-50 w-100"
//           type="text"
//           value={inputArguments}
//           onChange={(e) => {
//             setInputArguments(e.target.value);
//           }}
//           placeholder="Enter arguments separated by spaces"
//         />
//          <button type="submit" className="btn btn-success" onClick={handleSubmit}>
//         Run
//       </button>
//           </div>
//         </Row>
      
//       <br />

//      {/* <div className="output-section">
//      <h4>Output Section:</h4>
//       <div className="output">
//         <p>{output}</p>
//       </div>
//      </div> */}



// {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
//   Toggle bottom offcanvas
// </button>

// <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
//   <div class="offcanvas-header">
//     <h5 class="offcanvas-title" id="offcanvasBottomLabel">Resizable Offcanvas</h5>
//     <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//   </div>
//   <div class="offcanvas-body resizable-offcanvas-body">
  
//   </div>
// </div> */}

// <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Enable body scrolling</button>

// <div class="offcanvas offcanvas-bottom" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
//   <div class="offcanvas-header" style={{padding: "6px"}}>
//     <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Output Section:</h5>
//     <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//   </div>
//   <div class="offcanvas-body p-0">
//   {output && (
//   <div className="output-section p-0">
//     {/* <h4>Output Section:</h4> */}
//     <div className="output-container">
//       {/* Use dangerouslySetInnerHTML to render HTML */}
//       <p dangerouslySetInnerHTML={{ __html: output }} />
//     </div>
//   </div>
// )}
//   </div>
// </div>
//   {/* <Draggable /> */}
//     </Container>
//   );
// }

// export default App;