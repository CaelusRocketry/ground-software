import React, {useState, useEffect} from 'react';
import { CHECKLIST } from "../lib/checklist";

const Checklist = () => {

  return (

    <div>
      {Object.keys(CHECKLIST).map((stage) => (
        Object.keys(stage).map((element) => (
          <div>
            <input 
              onClick={() => {
                localStorage.setItem('toggle', localStorage.getItem('toggle') === 'true' ? 'false' : 'true') 
              }}
              checked={localStorage.getItem('toggle') === "true"}
              type="checkbox"
              style={{ fontSize: "20px", marginBottom: 5, marginTop: 8, marginLeft: 20 }}  
            /> 
            <label style={{marginLeft: "10px"}}>{element}</label>
          </div>
        ))
      ))}

    </div>  
  );
};

export default Checklist;
