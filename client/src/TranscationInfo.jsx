import React, { useEffect, useState } from 'react';
import { getUsers } from './api';

const TransactionInfo=()=>{
    const [data,setData]=useState({
            id:'',
            phone:''

    })

    const [records,setRecords]=useState([]);
    const [record,setRecord]=useState(null);

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

    const submit=()=>{
            console.log(data.id)
            console.log(data.phone)
            var flag=0;
            for(var i=0;i<records.length;i++)
            {
                console.log(records[i].id);
                console.log(records[i].phone);
                if(records[i].id==data.id)
                {
                    console.log("ues")
                    if(records[i].phone==data.phone)
                    {
                        setRecord(records[i]);
                        flag=1;
                        console.log("yeeeessss")
                    }
                }
            }
            if(flag===0)
            {
                setRecord(null)
            }
            
        }   

    const changee=(e)=>{
    
        const name=e.target.name;
        const value=e.target.value;
        console.log(name)
        console.log(value)
        setData((preData)=>({...preData,[name]:value}))
      }

//       if (records.length === 0) 
//   {
//     console.log("no")
//     return <p>Loading...</p>;}
//     else if(record===null)
//     {
//         return <p>not matched</p>;
//     }

  return (
   <>
          <label htmlFor='id'>Transaction Id</label>
          <input type="text" id="id" name="id" value={data.id} onChange={changee}/>
          <label htmlFor='phone'>Phone</label>
          <input type="text" id="phone" name="phone" value={data.phone} onChange={changee}/>
          <button onClick={submit}>Submit</button>
          {
            record ?(
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
            ):(
                records.length ===0 ? (
                    <p>Loading...</p>
                ): (
                    <>
                    </>
                )
            )
          }
   </>
  );
};

export default TransactionInfo;
