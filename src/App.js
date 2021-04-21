import * as React from "react"
import Query from "./components/Query"
import Map from "./components/Map"
import Footer from "./components/Footer"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from "./images/icon.svg"
import LoadingOverlay from 'react-loading-overlay';

// styles

const pageStyles = {
  color: "white",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  backgroundColor:"#29323c",
  height:"100%",
  minWidth:"99.5%",
  maxWidth:"99.5%",
  padding:5
  
}
const headerStyles={
  display: "flex",
  justifyContent: "space-between",
  margin:"2vh"
}
const recentralizeButtonStyles = {
  backgroundColor:"#26323c",
  border:"1px solid cyan",
  borderRadius:"1vh",
  color:"aliceblue",
  fontSize: "3vh",
}

const displayLineStyles={
  margin:"2vh",
  textAlign:"right",
  display: "flex",
  justifyContent: "space-between"
}

const container={
  display:"flex",
  flexDirection: 'row',
  border:"5px solid lightseagreen",
  minHeight:"80vh",
}
const logoStyles={
  width:"6vh",
  marginTop:"2.5vh",
  marginRight:"2.5vh"
  
}
const mapStyles = {
  minWidth: '70%',
  maxWidth: '70%',
  justifyContent:"center",
  marginTop:"auto",
  marginBottom:"auto",
}

const queryStyles = {
  minWidth: '30%',
  maxWidth: '30%',
  borderLeft:"3px solid lightseagreen",
  fontSize:"2.3vh",
  backgroundColor:"#20323c",
}


// markup
const IndexPage = () => {
  const [data, setData] = useState({ results: [] });
  const [detailsMap, setDetailsMap] = useState("");
  const [isLoad, changeLoad] = useState(false)
  const [center, changeCenter] = useState([22.31833206,114.209832494])
  const [zoom, changeZoom] = useState(14)
  let [loading, setLoading] = useState(true);


  useEffect( () => {
    async function fetchData() {
    const result = await axios(
      'https://sps-opendata.pilotsmartke.gov.hk/rest/getCarparkVacancies',
    );

    const map = await axios(
      ' https://sps-opendata.pilotsmartke.gov.hk/rest/getCarparkInfos?lang=zh_TW',
    );
    setDetailsMap(map.data.results)
    setData(result.data);
    changeLoad(true)
    }
    fetchData()
  },[]);

  useEffect(() => {
    setTimeout(() => {setLoading(!loading)},2500);
    
  }, []);

  const recentralize =()=>{
    changeCenter([22.31833206,114.209832494])
    changeZoom(14)
  }
  
  if (typeof window !== 'undefined') {
  return (
    
    
    <div style={pageStyles}>
      <div style={headerStyles}>
        <h1 style={{fontSize:"5vh"}} >九龍西停車場即時數據庫🇭🇰</h1>
        <div >
        <a href="https://issacto.github.io/KowloonWestParking" >
          <img style={logoStyles}src={Logo}></img>
          </a>
        </div>
      </div>
      <LoadingOverlay
        active={loading}
        spinner
        text='載入網站中'
      >
      <div style={container}>
        <div style={mapStyles}>
          <Map data={data} zoom={zoom} detailsMap ={detailsMap} center ={center}/>
          <div style={displayLineStyles}>
            <p style={{fontStyle: "italic",color:"grey"}}>{"(lat: " + center[0]}{" long: "+center[1]}{","}{zoom+") "}</p>
            <button style={recentralizeButtonStyles}onClick={recentralize}>宏觀</button>
          </div>
        </div>
        {isLoad?
        <div style={queryStyles}><Query data={data} detailsMap ={detailsMap} changeCenter={changeCenter} changeZoom={changeZoom} /></div>:null}
        </div>
        </LoadingOverlay>
        <Footer/>

    </div>
  )}
}

export default IndexPage