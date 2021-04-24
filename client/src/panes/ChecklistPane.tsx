import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import config from "../config.json";
import { stages, stageNames } from "../lib/locationNames";
import '@djthoms/pretty-checkbox';
import Header from '../components/Header';
import { CaelusState } from "../store/reducers";
import { useSelector } from "react-redux";
import Checklist from "../components/Checklist";
import { CHECKLIST } from "../lib/checklist";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 5px 40px;
  border-radius: 15px;
  margin: 10px 0px;
  cursor: pointer;  
`;


const stageParameters = [
  config.checklist.waiting,
  config.checklist.pressurization,
  config.checklist.autosequence,
  config.checklist.postburn
]

var x = 0;
var y = 0;

var arr = [ "false", "false", "false", "false", "false"];

const ChecklistPane = () => {
  
  const length = Object.keys(CHECKLIST).length;

  const currentStage = useSelector((state: CaelusState) =>
    stages.indexOf(state.data.general.stage)
  );

  function nextButtonPushed() {
    if (x < length) {
      x = x + 1;
    }
  }

  function backButtonPushed() {
    if (x > 0) {
      x = x - 1;
    }
  } 

  const handleCheckbox = () => {

    localStorage.setItem("check1", JSON.stringify(true) ? JSON.stringify(false) : JSON.stringify(true));
    console.log(localStorage.getItem("check1"));

  }

  localStorage.setItem("check1", "false")
  localStorage.setItem("check2", "false")



  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="pane"
    >
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Button style={{display:x===0?"none":"block"}} onClick={backButtonPushed}> Back </Button>
        <h1 style={{lineHeight:"50px", margin:"auto 20px", fontSize:"25px", fontWeight: "bold"}}>{stageNames[stages[x]]}</h1>
        <Button style={{display:x+1===length?"none":"block"}} onClick={nextButtonPushed}> Next </Button>
      </div>

      <div>
        {Object.entries(CHECKLIST[stages[x]]).map(([loc, elem]) => (
          <div style={{fontSize: "20px", marginTop: "10px"}}>
            <input 
              onClick={() => {
                localStorage.setItem(stages[x]+loc, localStorage.getItem(stages[x]+loc) === 'true' ? 'false' : 'true') 
              }}
              checked={localStorage.getItem(stages[x]+loc) === "true"}
              type="checkbox"
              style={{ fontSize: "20px", marginBottom: 5, marginTop: 8, marginLeft: 20 }}  
            /> 
            <label style={{marginLeft: "10px"}}>{elem}</label>
          </div>
        ))}

    </div>  
    </div>

  );
};


export default ChecklistPane;
