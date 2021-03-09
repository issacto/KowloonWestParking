import React, { useState, useEffect } from 'react';

import { MapContainer, useMap,TileLayer, Marker, Popup } from 'react-leaflet'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import MapObject from './mapObject.css'

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const popupStyles={
  fontSize:"2vh"
}
const App = props => {
  console.log(props.data )
  const data =  props.data 
  const detailsMap =  props.detailsMap 
  const [center, changeCenter] = useState(props.center)
  const [zoom, changeZoom] = useState(props.zoom)

  useEffect(async () => {
    console.log(props.center)
    changeCenter(props.center)
  },[props.center]);

  useEffect(async () => {
    console.log(props.zoom)
    changeZoom(props.zoom)
  },[props.zoom]);

  function SetViewOnClick() {
    const map = useMap();
    console.log(zoom)
    map.setView(center,zoom);
    return null;
  }

  const Mapping = (itemId,timeUpdated,item) => {
    const carpark =   detailsMap.filter(x => x._id == itemId)[0]
    const name = <p>{carpark.name}</p>
    const position = [carpark.coordinates[1],carpark.coordinates[0]]
    var tempArray = timeUpdated.split("T")
    var date = tempArray[0]
    var tempTimeArray = tempArray[1].split(":")
    var timeDislpay = date +" "+ tempTimeArray[0] +":"+ tempTimeArray[1]
    
    return (
        <Marker 
        position={position}
        >
          <Popup >
            <div style={popupStyles}>
              <p style={{fontSize:"3vh"}}>{name}</p>
              <p>{item.privateCar?"。私家車: "+item.privateCar.vacancy:null} </p>
              <p>{item.motorCycle?"。電單車:  "+item.motorCycle.vacancy:null} </p>
              <p>{item.HGV?"。重型貨車:"+item.HGV.vacancy:null} </p>
              <p>{item.LGV?"。輕型貨車: "+item.LGV.vacancy:null} </p>
              <p>。更新時間:{" "}{timeDislpay}</p>
            </div>
          </Popup>
        </Marker>
        )
      };

    return (
      <>
     <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data?data.results.map(item => (

      <div>
        { Mapping(item._id, item.lastUploadDate,item)}
      </div>
      )):null}
    <SetViewOnClick/>
  </MapContainer>
 

    </>
    );
  }
   
  export default App;