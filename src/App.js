// src/App.js
import React, { useState } from 'react';
import './App.css';
import moment from 'moment';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const[date,setDate]=useState(moment().toLocaleString())
  const [checkIn, setCheckIn] = useState(moment().toLocaleString());
  const [checkOut, setCheckOut] = useState(moment().toLocaleString());
  const[userAtendenceData,setUserAtendencedATA]=useState([])
   console.log(moment().format('YYYY-MM-DD'))
   console.log(moment().format('HH:mm:ss'))

  const handleCheckIn = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, date,checkIn }),
      });

      if (response.ok) {
        alert('Check-in successful');
        setEmail("")
        setName("")
      } else {
        console.error('Check-in failed');
      }
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,date, checkOut }),
      });

      if (response.ok) {
        alert('Check-out successful');
        setEmail("")
        setName("")
      } else {
        console.error('Check-out failed');
      }
    } catch (error) {
      console.error('Error during check-out:', error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/attendance/${email}`);
      if (response.ok) {
        const data = await response.json();
        setUserAtendencedATA(data)
        console.log('Attendance data:', data);
      } else {
        console.error('Failed to fetch attendance data');
      }
    } catch (error) {
      console.error('Error during attendance data fetch:', error);
    }
  };
  const fetchAllAttendanceData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/attendance/all');
      if (response.ok) {
        const data = await response.json();
        console.log('All Attendance data:', data);
      } else {
        console.error('Failed to fetch all attendance data');
      }
    } catch (error) {
      console.error('Error during all attendance data fetch:', error);
    }
  };
  console.log(userAtendenceData)

  return (
    <div className="App" style={{backgroundColor:"black",color:"red",  }}>
      <h1 style={{color:"wheat"}}> May I Help You  </h1>
      <div>
        <label>Email:</label>
        <input style={{padding:"1vh"}} placeholder='Enter Your E-Mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Name:</label>
        <input style={{padding:"1vh" ,marginTop:"1vh"}} placeholder="Enter your Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div style={{display:"flex", flexDirection:"row", gap:"1vh",marginTop:"2vh"}}>
      <button style={{backgroundColor:"green",width:"20vw", padding:"2vh", borderRadius:"2vh"}} onClick={handleCheckIn}>Check In</button>
      <button style={{backgroundColor:"red",width:"30vw", padding:"2vh", borderRadius:"2vh"}} onClick={handleCheckOut}>Check Out</button>
      <button style={{backgroundColor:"yellow",width:"30vw", padding:"2vh", borderRadius:"2vh"}} onClick={fetchAttendanceData}>Fetch Attendance Data</button>
      <button style={{backgroundColor:"white",width:"30vw", padding:"2vh", borderRadius:"2vh"}} onClick={fetchAllAttendanceData}>Fetch All Attendance Data</button>
      </div>
      <div  style={{display:"flex" ,flexDirection:"row", justifyContent:"space-around",backgroundColor:"black", color:"wheat"}}>
        <div>
         <h2>UseEmail</h2>
        {
        userAtendenceData.map((value,index)=>{
          return(<>
              <p>    
               
               {value.employeeEmail}
               </p>
          </>)
        })

      }
        </div>
        <div>
       <h2>checkIn time</h2>
        {
        userAtendenceData.map((value)=>{
          return(<>
               <p>    
               
                {value.checkIn}
                </p>
          </>)
        })

      }
        </div>
        
        <div>
        <h2> check Out Time</h2>

        {
        userAtendenceData.map((value)=>{
          return(<>
               <p>    
               
                {value.checkOut}
                </p>
          </>)
        })

      }
      </div>
        </div>
        <table border={3}>
              
       
      </table>
    </div>

  );
}

export default App;
