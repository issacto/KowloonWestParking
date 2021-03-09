import * as React from "react"


const mainStyles={
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    marginTop:"4.7vh",
    fontSize:"1.7vh",
    fontStyle: "italic"
   
}
const IndexPage = () => {
    return(
        <div style={mainStyles}>
            <a href="https://data.gov.hk/en/" >
                <p style={{color:"grey"}}>Data@DATA.GOV.HK {"  "}</p>
            </a>
            <a href="https://github.com/issacto" >
                <p style={{color:"grey",  display:"inline"}}>Copyright@IssacTo </p>
            </a>
            
        </div>
    )
}
export default IndexPage