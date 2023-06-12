import React, { useEffect, useState } from 'react';
import { getUsers } from './api';

const Display=()=>{
  const [records,setRecords]=useState([]);
  const [index,setindex]=useState(0);

  useEffect(()=> {
        fetchRecords();
  }, []);

   const fetchRecords=async()=>{
    try {
        const fetchedRecords = await getUsers();

        setRecords(fetchedRecords.data);
          console.log(records)
      } catch (error) {
        console.error('Error fetching records:', error);
    }
  };

  const nextt=()=>{
        setindex((prevIndex)=>(prevIndex===records.length-1 ? 0 : prevIndex+1));
        console.log(index)
  };

  const previous=()=>{


    setindex((prevIndex)=>(prevIndex===0 ? records.length-1 : prevIndex-1));
    console.log(index)
  };

  if (records.length === 0) 
  {
    console.log("no")
    return <p>Loading...</p>;}
  const record = records[index];

  return (
    <div>
      <div>
        <p>Transaction Id: {record.id}</p>
        <p>Name: {record.name}</p>
        <p>Email: {record.email}</p>
        <p>Account Number: {record.num}</p>
        <p>CNIC: {record.cnic}</p>
        <p>Date: {record.date}</p>
        <p>Time: {record.time}</p>
        <p>Phone Number: {record.phone}</p>
        <p>Amount: {record.amount}</p>
      </div>
      <div>
        <button onClick={nextt}>Previous</button>
        <button onClick={previous}>Next</button>
      </div>
    </div>
  );
};

export default Display;
