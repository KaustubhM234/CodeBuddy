import React, { useState } from 'react';
import './Ask.css'; // Import your CSS file
import axios from 'axios';
function Ask() {
  const [result, setResult] =useState('');
  const [resultextract, setresultextract] = useState('');
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
    setresultextract(formattedResponse);
    
    //   setResult(response.data);
    try {
        // console.log(formattedResponse);
        const res = await axios.post('http://localhost:5000/chatbot', { prompt: "Code:"+ formattedResponse + "till here. Provide complete code if its incomplete,fix the errors in the code if any and also give a short explanation.Use c language" });
  
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
    <>
    {/* <div className="row form-container" style={{maxHeight:"680px"}}> */}
    <div className="row form-container" style={{  backgroundImage: 'url("https://i.pinimg.com/originals/ed/d0/fb/edd0fb4fd798bc12ef8773a03f8a19b8.gif")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="my-3 upload-files-container my-10">
        <div className="drag-file-area">
          <span className="material-icons-outlined upload-icon">
            End your doubts here
          </span>
          <h3 className="dynamic-message">Drag & drop any file here</h3>
          <label className="label">
            or{' '}
            <span className="browse-files">
              
              <input type="file" accept="image/*" onChange={handleReportUpload} />
              {/* <span className="browse-files-text">browse file from device</span>  */}
            </span>
          </label>
        </div>
       
        
        
        <p>Note: Upload only printed text in any form (No handwritten).</p>
      </div>

      <div className="row">
  <div className="col-lg-6 col-md-12 col-sm-12">
    <div className="scrollable-box">
      <h4 style={{ color: 'rgb(247 255 247)',textAlign:'center' }}>Text extracted from image</h4>
      {resultextract && (
            <div>
            
              {/* Use dangerouslySetInnerHTML to render HTML */}
              <p style={{ color: 'cadetblue'}} dangerouslySetInnerHTML={{ __html: resultextract }} />
            </div>
          )}
    </div>
  </div>

  <div className="col-lg-6 col-md-12 col-sm-12">
    <div className="scrollable-box">
      <h4 style={{ color: 'rgb(247 255 247)', textAlign:'center' }}>Response</h4>
      {result && (
            <div>
             
              {/* Use dangerouslySetInnerHTML to render HTML */}
              <p style={{ color: 'cadetblue'}} dangerouslySetInnerHTML={{ __html: result }} />
            </div>
          )}
    </div>
  </div>
</div>


    </div>

   
    </>
  );
}

export default Ask;
