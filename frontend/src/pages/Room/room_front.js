import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// // import Doctor from "./img/doctor.jpg"
// // import "../Styles/vc.css";
import './room.css';

function RoomFront() {
  const [roomID, setRoomID] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate(`/room/${roomID}`);
  };

  //     return (
  //         <div className="flex h-screen justify-center items-center">
  //             <div className="w-full max-w-screen-lg mx-auto flex">
  //                 {/* Left Div */}
  //                 <div className="w-1/2 flex justify-center items-center">
  //                     <img className="hero-image1" src="https://img.freepik.com/free-vector/online-meetup-abstract-concept-vector-illustration-conference-call-join-meetup-group-video-call-online-service-distance-communication-informal-meeting-members-networking-abstract-metaphor_335657-2920.jpg?w=740&t=st=1696415451~exp=1696416051~hmac=1e54c249f8b7a4a25b0ec44600267ab83cce50ec5a2b29183df1df179200b093"
  //                      alt="Doctor" />
  //                 </div>

  //                 {/* Right Div */}
  //                 <div className="w-1/2 flex flex-col items-center">
  //                     <div className='text-center'>
  //                         <h1>One on One Consultation</h1>
  //                         <h2 className="text-title">Free first appointment</h2>
  //                         </div>

  //                     <div className="input mt-4">
  //                         <input
  //                             placeholder="Enter Meet Name"
  //                             type="text"
  //                             value={roomID}
  //                             onChange={(e) => setRoomID(e.target.value)}
  //                             className="border p-2 rounded w-64"
  //                         />
  //                         <button
  //                             className="text-appointment-btn bg-blue-500 text-white px-4 py-2 rounded-full mt-2 hover:bg-blue-700"
  //                             type="button"
  //                             onClick={handleJoin}
  //                         >
  //                             Join
  //                         </button>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     );
  // }

  // export default function Example() {
  return (
    <div className='container' style={{marginTop:"110px"}}>
      <div className='row col-12 '>
        <div className='col-lg-6 col-12 d-flex justify-content-center align-items-center px-5'>
          <div className="text-center">
            <h1 className="">
             Create Study Room
            </h1>
            <p className="mt-4 ">
              It fosters a supportive environment where individuals can openly share concerns, receive expert guidance, and gain valuable insights, enhancing their overall well-being and decision-making processes.
            </p>

            <input
              placeholder="Enter Meet Name"
              type="text"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              className="border p-2 mx-2 rounded w-64 my-2"
            />

            <button
              onClick={handleJoin}
              className="btn btn-outline-info"
            >
              Join
            </button>
          </div>
        </div>

        <div className='mt-10 col-lg-6 col-12 d-flex justify-content-center align-items-center '>
          {/* Decorative image grid */}

          <img src="https://img.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg?w=1060&t=st=1697087406~exp=1697088006~hmac=b2bcf21362d035cc0c247ed131fd6874bad1fd3478bc4c801f3c07fdd1f6f9da"
            alt=""
            className=" w-100 image h-full w-full object-cover object-center"
          />

        </div>

      </div>

    </div>


  );
}
export default RoomFront;





