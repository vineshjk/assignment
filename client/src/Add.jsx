
import {useEffect, useState} from 'react'
import { addUser } from './api';


function Add() {

  const [data,setData]=useState({
    num:'',
    name:'',
    cnic:'',
    currency:'PKR',
    amount:'',
    email:'',
    phone:''
  })
  
  var myHeaders = new Headers();
myHeaders.append("apikey", "SZ45jk23xwz6SHJUVxZhzOzLu8eKLLOH");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
var a;
const checkkUsd=async()=>{
  
    fetch("https://api.apilayer.com/exchangerates_data/convert?to=PKR&from=USD&amount=1", requestOptions)
    .then(response => response.json())
    .then((result) => {
      SetUsd(result)
   
    })  .catch(error => console.log('error', error));
}
const checkkEur=async()=>{
  
    fetch("https://api.apilayer.com/exchangerates_data/convert?to=PKR&from=EUR&amount=1", requestOptions)
    .then(response => response.json())
    .then((result) => {
      SetEur(result)
      console.log(result)
   
    })  .catch(error => console.log('error', error));
}
const [usd,SetUsd]=useState(0);
const [eur,SetEur]=useState(0);

useEffect(()=>{
   
checkkUsd()
checkkEur()

 
},[])
  const submit= async(e)=>{
    e.preventDefault()
  
    const name="amount";
    
    console.log(usd["result"])
    console.log(eur["result"])
    console.log(data.amount)
     a=data.amount;
    console.log(a)
    if(data.currency=='USD')
    {
        console.log("heeee")
        a=data.amount*usd["result"]
       
        console.log(a)
    }
    if(data.currency=='EUR')
    {
        console.log("dasad")
        a=data.amount*eur["result"]
        console.log(a)
    }
   
    

    const cnic1 = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
    const valid = cnic1.test(data.cnic);

    if (!valid) {
    alert("INVALID CNIC");
    return;
    }
    const phone1 = /^0\d{10}$/;
    const valid1 = phone1.test(data.phone);
    
    if (valid1) {
      console.log('Phone number is valid');
    } else {
        alert("INVALID Phone Number");
        return;
    }
    console.log("yes")
    console.log(a); 
    console.log(data)
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    console.log(currentDate);
    console.log(currentTime);



const data1={
    num:data.num,
    name:data.name,
    cnic:data.cnic,
    date:currentDate,
    time:currentTime,
   
    amount:a,
    email:data.email,
    phone:data.phone
}
console.log(data1)

   const res=await addUser(data1);
   console.log(res.data.mes)
     alert("your transaction id is "+res.data.mes);
    
    
    
    

  }
  const changee=(e)=>{
    
    const name=e.target.name;
    const value=e.target.value;
    console.log(name)
    console.log(value)
    setData((preData)=>({...preData,[name]:value}))
  }
  return (
   <>
      

          <label htmlFor='num'>Account Number</label>
          <input type="text" id="num" name="num" value={data.num} onChange={changee}/>
          <label htmlFor='name'>Bank Name</label>
          <select id="name" name="name" value={data.name} onChange={changee}>
            <option value="">Select Bank</option>
            <option value="HBL">HBL</option>
            <option value="UBL">UBL</option>
            <option value="MCB">MCB</option>
          </select>
          <label htmlFor='cnic'>Cnic</label>
          <input type="text" id="cnic" name="cnic" value={data.cnic} onChange={changee}/>
          <label htmlFor='currency'>Currency</label>
          <select id="currency" name="currency" value={data.currency} onChange={changee}>
            <option value="PKR">PKR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <label htmlFor='amount'>Amount</label>
          <input type="text" id="amount" name="amount" value={data.amount} onChange={changee}/>
          <label htmlFor='email'>Email</label>
          <input type="text" id="email" name="email" value={data.email} onChange={changee}/>
          <label htmlFor='phone'>Phone Number</label>
          <input type="text" id="phone" name="phone" value={data.phone} onChange={changee}/>
          <button onClick={submit}>Submit</button>
         
          

          
      
   </>
  );
}

export default Add;
