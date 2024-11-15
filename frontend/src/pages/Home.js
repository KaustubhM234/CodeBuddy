import React, { useState, useEffect, useRef} from "react";
// import "./App.css";
import axios from "axios";
import MonacoEditor from 'react-monaco-editor';
import { Row, Col, Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
// import GptUI from '../components/chatGptUI';
import GPTUI from '../components/ChatBot.jsx';
import "./home.css";

export default function Home() {
  const [code, setCode] = useState("hello");
  const [inputArguments, setInputArguments] = useState("");
  const [output, setOutput] = useState("Output will be displayed here!");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [analysisResult, setAnalysisResult] = useState({
    time_comp: "",
    space_comp: "",
    algo_type: "",
  });

  const handleSubmit = async () => {
    const payLoad = {
            language: selectedLanguage,
            code,
            arguments: inputArguments,
          };
          // alert(inputArguments);
          // const {data} = await axios.post("http://localhost:5000/run", payLoad);
      
          try{
            const {data} = await axios.post("http://localhost:5000/run", payLoad);
            const formattedOutput= data.output.replace(/\n/g, '<br/>');
            setOutput(formattedOutput);
            // console.log(data.output);
          }catch(err){
            console.log(err.response);
            alert("Error: Please check the console.")
          }
        };
    
      // const handleLanguageChange = (event) => {
      // setSelectedLanguage(event.target.value);
      // };
    
      const handleAnalysis = async () => {
        try {
          const { data } = await axios.post("http://localhost:5000/analysis", {
            code: code,
          });
          setAnalysisResult(data);
        } catch (err) {
          console.log(err.response);
          alert("Error: Please check the console.");
        }
      };

    const Langselector = () =>{
    const res =  document.getElementById('langselector').value;
    // console.log(res);
    if(res==1){
      setSelectedLanguage('cpp');
      setCode(
        `#include <stdio.h>
    int main() {
      printf("Hello World");
      return 0;
  }`);
    }
    if(res==2){
      setSelectedLanguage('javascript');
      setCode("");
    } 
    if(res==3){
      setSelectedLanguage('python');
      setCode("");
    }

    
  }
  // console.log(selectedLanguage);
  return (
    <Container style={{ border:"1px solid #000000", maxWidth: "100%", margin: "0px", backgroundColor:"#141414"}} >
      
      <div classname="container m-0" >
        
      <div style={{ display: 'flex', alignItems: 'center', margin:"0px", justifyContent:"end"}}>
    <h6>Language:</h6>

    <Form.Select aria-label="Default select example" id="langselector" onChange={Langselector} style={{marginLeft:'55px', width: '127px', margin: '5px', backgroundColor: '#f0f0f0', borderRadius: '3px', border: '1px solid #ccc', fontFamily: 'Onest', fontSize: '16px', color: '#333' }}>
        <option value="0">--select--</option>
        <option value="1">C</option>
        <option value="2">JavaScript</option>
        <option value="3">Python</option>
    </Form.Select>

    </div >
      </div>
   

       
    {/* <div className="App"> */}
      {/* <select>
            className="select"
            value={selectedLanguage}
            onChange={handleLanguageChange}>
              <option value="c">C</option>
              <option value="javascript">JavaScript</option>
      </select> */}
      {/* Replace the textarea with MonacoEditor */}
      {/* <div class="row"> */}
      <Row >
        <div className="col-lg-12 col-sm-12 col-md-12" >
        <MonacoEditor 
        height="500px"
        width="100%"
       // Set the desired height
        language={selectedLanguage}
        theme="hc-black"
        value={code}
        
        options={{
          selectOnLineNumbers: true,
        }}
        onChange={(newValue) => {
          setCode(newValue);
        }}
        
      />
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h3> Input data: </h3>
          <textarea className="h-50 w-100"
          type="text"
          value={inputArguments}
          onChange={(e) => {
            setInputArguments(e.target.value);
          }}
          placeholder="Enter arguments separated by spaces"
        />
         <button type="submit" className="btn btn-success" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onClick={handleSubmit}>
        Run
      </button>
      <button type="button" class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={handleAnalysis}>Analysis</button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h1 class="modal-title fs-5 " id="exampleModalLabel">Analysis</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Time complexity:{analysisResult.time_comp}
            </label>
            {/* <input type="text" class="form-control" id="recipient-name" /> */}
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Space complexity: {analysisResult.space_comp}</label>
            {/* <textarea class="form-control" id="message-text"></textarea> */}
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Type of algorithm:{analysisResult.algo_type}</label>
            {/* <textarea class="form-control" id="message-text"></textarea> */}
          </div>
        </form>
      </div>
      {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div> */}
    </div>
  </div>
</div>

          </div>
        </Row>
      
      <br />

     {/* <div className="output-section">
     <h4>Output Section:</h4>
      <div className="output">
        <p>{output}</p>
      </div>
     </div> */}



{/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
  Toggle bottom offcanvas
</button>

<div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasBottomLabel">Resizable Offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body resizable-offcanvas-body">
  
  </div>
</div> */}

{/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Enable body scrolling</button> */}

<div class="offcanvas offcanvas-bottom" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header" style={{padding: "6px"}}>
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Output Section:</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body p-0">
  {output && (
  <div className="output-section p-0">
    {/* <h4>Output Section:</h4> */}
    <div className="output-container">
      {/* Use dangerouslySetInnerHTML to render HTML */}
      <p dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  </div>
)}
  </div>
</div>
  {/* <Draggable /> */}
  <GPTUI code={code}/>
    </Container>
  )
}
