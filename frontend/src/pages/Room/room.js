// import React, { useEffect } from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { useParams } from 'react-router-dom';

// function Room() {
//   const { roomID } = useParams();

//   // Define the peerConnectionGetStats function
//   async function peerConnectionGetStats(peerConnection) {
//     try {
//       const stats = await peerConnection.getStats();
//       return stats;
//     } catch (error) { 
//       console.error('Error fetching stats:', error);
//       throw error;
//     }
//   }

//   useEffect(() => {
//     const myMeeting = async (element) => {
//       const appID = 1719434705;
//       const serverSecret = "d99bee964f6f6b8b27e9ee17efab41b9";
//       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appID,
//         serverSecret,
//         roomID,
//         Date.now().toString(),
//         "Student"
//       );

//       const zp = ZegoUIKitPrebuilt.create(kitToken);

//       // Get local stream for peer connection
//       const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

//       // Create a peer connection with local stream
//       const peerConnection = new RTCPeerConnection();
//       localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

//       // Join room with the peer connection
//       zp.joinRoom({
//         container: element,
//         sharedLinks: [
//           {
//             name: 'Share link',
//             // Update the URL with the correct path
//             url: `http://localhost:3000/room/${roomID}`,
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.OneONoneCall,
//         },
//         success: () => {
//           // Do something on successful join
//         },
//         remoteStreamUpdate: (type, streamList) => {
//           // Handle remote stream updates
//         },
//       });

//       // Get stats using the modified peerConnectionGetStats function
//       try {
//         const stats = await peerConnectionGetStats(peerConnection);
//         console.log('Peer Connection Stats:', stats);
//       } catch (error) {
//         // Handle error if necessary
//       }
//     };

//     // Create and join the room
//     const roomContainer = document.getElementById('room-container');
//     myMeeting(roomContainer);

//     // Clean up peer connection on component unmount
//     return () => {
//       // Clean up code (e.g., close the peer connection)
//     };
//   }, [roomID]);

//   return (
//     <div className="h-screen flex flex-col justify-center bg-gray-100">
//       <div id="room-container">Room</div>
//     </div>
//   );
// }

// export default Room;



import React from "react";
import { useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
    const {roomId} = useParams();

    const myMeeting = async (element) => {
        const appID = 1257650683;
        const serverSecret = "a159babde09290531144168aa9dc1169";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(),"Vidhi");
   
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
        container: element,
        scenario:{
            mode: ZegoUIKitPrebuilt.VideoConference,
        },
    });
}
    return(
        <div className="room-page">
            <div ref={myMeeting}/>
        </div>
    )
}

export default Room;

