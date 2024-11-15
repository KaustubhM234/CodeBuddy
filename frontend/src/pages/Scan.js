import React, { useState } from 'react';
import axios from 'axios';
// import ChatBot from '../components/ChatBot.jsx';
export default function Scan() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('hey');
  
  const handleReportUpload = async (e) => {
    // console.log("hi")
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    // console.log(typeof(formData[0]));

    try {
      const response = await axios.post('http://localhost:8000/api/Scan-repo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      });
      // console.log("hi")
    //   console.log(response.data);
    const formattedResponse = response.data.replace(/\n/g, '<br/>');
    // console.log(formattedResponse);
    setResult(formattedResponse);
    
    //   setResult(response.data);
    try {
        // console.log(formattedResponse);
        const res = await axios.post('http://localhost:5000/chatbot', { prompt: "this is some code:"+ formattedResponse + "till here. Provide complete code regarding this in C" });
  
        // Replace line breaks with HTML line breaks for formatting
        const formattedResponse1 = res.data.replace(/\n/g, '<br/>');
  
        setResult(formattedResponse1);
      } catch (error) {
        console.error('Error:', error);
      }


    } catch (error) {
      console.error('Error uploading Report:', error);
    }
    

   

  };
  return (
    <div><h1>SCAN</h1>
      <input type="file" accept="image/*" onChange={handleReportUpload} />
      {/* {result && <div>Report: {result}</div>} */}
      {result && (
            <div>
              <h3>Response:</h3>
              {/* Use dangerouslySetInnerHTML to render HTML */}
              <p dangerouslySetInnerHTML={{ __html: result }} />
            </div>
          )}
          {/* <ChatBot /> */}
          </div>

  )
}
