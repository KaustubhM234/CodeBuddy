import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ChatGPT.css'; // Import your custom CSS file for styling
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Row } from 'react-bootstrap';
import axios from 'axios';

const ChatGPT = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [showChat, setShowChat] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fullPrompt = prompt; // Initialize with the prompt text
    // Check if specific conditions are met to include the code
    // if (shouldIncludeCode()) {
    //   fullPrompt += `\n${code}`;
    // }

    try {
      const res = await axios.post('http://localhost:5000/chatbot', { prompt: fullPrompt });

      // Replace line breaks with HTML line breaks for formatting
      const formattedResponse = res.data.replace(/\n/g, '<br/>');

      setResponse(formattedResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to determine when to include the code
  const shouldIncludeCode = () => {
    // Add your conditions here
    // For example, you can check if the prompt contains certain keywords
    return prompt.includes('debug this code') || prompt.includes('explain the code');
  };


  const handleChatClick = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };
  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}>
      Need Assistance
    </Tooltip>
  );

  return (
    <div className="fixed-chat-icon">
      <OverlayTrigger
        placement="top"
        color="success"
        overlay={renderTooltip}
        delay={{ show: 250, hide: 400 }}
      >
        <Button
          variant="outline-success"
          onClick={handleChatClick}
          className="chat-icon-btn p-0"
        >
          <svg style={{ height: "26px", marginBottom: "6px", fill: "currentColor" }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" /></svg>
        </Button>
      </OverlayTrigger>
      <Modal show={showChat} onHide={handleCloseChat} className="chat-modal">
        <Modal.Header closeButton>
          <Modal.Title>Chat with ChatGPT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {response && (
            <div>
              <h3>Response:</h3>
              {/* Use dangerouslySetInnerHTML to render HTML */}
              <p dangerouslySetInnerHTML={{ __html: response }} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
            <form onSubmit={handleSubmit} className='row col-12'>
              <div className='col-10'>
                <input
                  type="text"
                  id="prompt"
                  className='form-control'
                  placeholder='Enter Your Prompt'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>
              <div className='col-2'>
                <button className='btn btn-success' type="submit">Submit</button>
              </div>
            </form>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChatGPT;


// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import './ChatGPT.css'; // Import your custom CSS file for styling
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
// import { Row } from 'react-bootstrap';

// const ChatGPT = () => {
//   const [showChat, setShowChat] = useState(false);

//   const handleChatClick = () => {
//     setShowChat(true);
//   };

//   const handleCloseChat = () => {
//     setShowChat(false);
//   };
//   const renderTooltip = (props) => (
//     <Tooltip id="tooltip" {...props}>
//       ASK GPT!
//     </Tooltip>
//   );

//   return (
//     <div className="fixed-chat-icon">
//           <OverlayTrigger
//         placement="top"
//         color ="success"
//         overlay={renderTooltip}
//         delay={{ show: 250, hide: 400 }}
//       >
//       <Button
//         variant="outline-success"
//         onClick={handleChatClick}
//         className="chat-icon-btn p-0"
//       >
//        <svg style={{height:"26px" , marginBottom:"6px"}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>
//       </Button>
//       </OverlayTrigger>
//       <Modal show={showChat} onHide={handleCloseChat} className="chat-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>Chat with ChatGPT</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Add your chat interface here */}
//           {/* You can use a chat library or create your own chat component */}
//         </Modal.Body>
//         <Modal.Footer>
//             <div className='row col-12'>
//                 <div className='col-10'>
//                 <input type='text' className='form-control' placeholder='Enter Your Prompt'></input>
//                 </div>
//                 <div className='col-2'>
//                 <Button variant="success" onClick={handleCloseChat}>
//             SEND
//           </Button>
//                 </div>
//             </div>
          
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ChatGPT;
