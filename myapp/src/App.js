import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import {SearchIcon } from '@chakra-ui/icons'
function App() {

  const [countryData, setCountryData]=useState([])
  const [localData,setLocalData]=useState([])

  const fetchData=async()=>{
   
    try {
      const response=axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,currencies,capital`)
      response.then((res)=>{
        console.log(Object.keys(res.data))
        setCountryData(res.data)
        setLocalData(res.data)
      })
      .catch((err)=>console.error(err))
    
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

const handelSearch=(inputKey)=>{
  if(!inputKey){
    setLocalData(countryData)
  }
  else{
    const filterData=countryData.filter((el)=>Object.keys(el.currencies).includes(inputKey.toUpperCase()))
   
    setLocalData(filterData)
    
   
  }
}
  return (
    <div className='main-container'>
      <h1>Search Country by Currency Name</h1>
      <div className='search-container'>
      {/* <input type='text'  placeholder='Enter Currency E.g.INR or EUR' onChange={(e)=>handelSearch(e.target.value)}/> */}
      <InputGroup>
      <InputLeftElement  pointerEvents="none"
            children={<SearchIcon color="gray.300" />}/>
      <Input
            type='text'
            placeholder='Enter Currency to find Country E.g. INR or EUR'
            onChange={(e) => handelSearch(e.target.value)}
          />
      </InputGroup>
      </div>
      <div className='grid-container'>
        {localData.length===0 ?
        (<h1>No Country with this Currency</h1>) :
        (localData.map((el,i)=>{

          return (
            <div key={i}>
            <img src={el.flags.png} alt="flags"/>
            <h2>{el.name.common}</h2>
            <h3><strong>Capital : </strong>{el.capital[0]}</h3>
            {/* <h3><strong>Currency : </strong>{Object.keys(el.currencies)}</h3> */}
            </div>
            )
        }))}
      </div>
    </div>
  );
}

export default App;
