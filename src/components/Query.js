import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import { useState, useEffect } from 'react';
import ClicklingIcon from "../images/clicking.svg";
import HomeIcon from "../images/home.svg";

const containerStyles = {
  paddingTop:"1vh",
  paddingLeft:"1vh",
  paddingRight:"1vh",
  overflowY: "auto",
  height:"71vh",
  minHeight:"71vh",
}

const headerStyles = {
  justifyContent:"center",
  textAlign:"center",
  paddingTop:"2vh",
  backgroundColor:"#434343 ",
  border:"solid 1px cyan",
  width:"100%",
  height:"6vh"
}

const homeButtonStyles={
  backgroundColor:"#26323c",
  borderRadius:"50%"
}

const zoomButtonStyles={
  textAlign:"right",
  marginRight:"1vh",
  marginBottom:"1vh"
}

const buttonStyles={
  backgroundColor:"#26323c",
  border:"1px solid cyan",
  borderRadius:"0.5vh",
  color:"white",
  fontSize: "2vh",
  padding:"0.8vh"
}

const boxStyle =(color)=> {
  if(color=="cyan")
  return({
  width:"80%",
  border:"3px solid cyan",
  padding:"1vh",
  borderRadius:"1vh",
  backgroundColor:"#434343",
  paddingLeft:"4vh",
  paddingTop:"1vh",
  fontSize:"2.5vh",
  marginBottom:"3vh"})
  else 
  return({
    width:"80%",
    border:"3px solid lightseagreen",
    padding:"1vh",
    borderRadius:"1vh",
    backgroundColor:"#434343",
    paddingLeft:"4vh",
    paddingTop:"1vh",
    fontSize:"2.5vh",
    marginBottom:"3vh"})
}

const titleStyles={
  fontSize:"2.5vh",
  display:"inline",
  
}

const titleBoxStyles = {
  marginBottom:"4vh"
}


const App = props => {
    const data =  props.data 
    const detailsMap =  props.detailsMap 

    const Mapping = (itemId,timeUpdated,item) => {
      const carpark =   detailsMap.filter(x => x._id == itemId)[0]
      var count =0
      const a =item.privateCar?item.privateCar.vacancy:0 
      const b = item.motorCycle?item.motorCycle.vacancy:0 
      const c = item.HGV?item.HGV.vacancy:0  
      const d = item.LGV?item.LGV.vacancy:0 
      count+= (a+b+c+d)
      console.log(count)
      var color = "cyan"
      if(count<100) color = "lightseagreen"
      const x = <div style={titleBoxStyles}>
                <p style={titleStyles}>{carpark.name} ???</p>
                <p style={{display:"inline",color:color}}>
                {"?????????"}{count}</p>
                </div>
      var tempArray = timeUpdated.split("T")
      var date = tempArray[0]
      var tempTimeArray = tempArray[1].split(":")
      var timeDislpay = date +" "+ tempTimeArray[0] +":"+ tempTimeArray[1]
      return (
      <div >
          <Collapsible trigger={x}>
            <div style ={boxStyle(color)}>
            <Collapsible  trigger={<div><p style={{ marginBottom:"0",display:"inline"}}>?????????????????????</p><img src={ClicklingIcon} width="30vh" style={homeButtonStyles}/></div>}>
              <p>{carpark.nature? "????????????: " + carpark.nature:null}</p>
              <p>{carpark.type? "?????????: " + carpark.type:null}</p>
              <p>{carpark.openingHours? "???????????????: " + carpark.openingHours[0].periodStart:null}</p>
              <p>{carpark.openingHours? "???????????????: " + carpark.openingHours[0].periodEnd:null}</p>
            </Collapsible>
              <p>{item.privateCar?"????????????: "+item.privateCar.vacancy:null} </p>
              <p>{item.motorCycle?"????????????: "+item.motorCycle.vacancy:null} </p>
              <p>{item.HGV?"???????????????: "+item.HGV.vacancy:null} </p>
              <p>{item.LGV?"???????????????: "+item.LGV.vacancy:null} </p>
              <p style={{fontSize:"2vh"}}>???????????????: {timeDislpay}</p>
              <div style={zoomButtonStyles}>
                <button style={buttonStyles} onClick={
                  ()=>{props.changeCenter([carpark.coordinates[1],carpark.coordinates[0]]);
                      props.changeZoom(24)}}>??????????????????</button>
              </div>
            </div>
          </Collapsible>
          
      </div>)
    };
    //<button style={titleStyle}onClick={recentralize}>??????</button>
    return (
      <>
      
        <div style={headerStyles}>
        <h2 style={{display:"inline",marginBottom:"0.3vh"}}>????????? {" "}</h2>
        </div>
        <div style={containerStyles}>
          <ul>
            {data?data.results.map(item => (
              <li key={item._id}> { Mapping(item._id, item.lastUploadDate,item)}</li>
            ))
            :
            null
            }
          </ul>
      </div>
      </>
    );
  }
   
  export default App;

  /**
   * {data.hits.map(item => (
          <li key={item._id}>
            <p>{item.closed}</p>
          </li>
        ))}
   */