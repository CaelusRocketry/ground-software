import React from 'react';
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react';
import styled from 'styled-components';


import config from "../config.json";
import { stages, stageNames } from "../lib/locationNames";
import '@djthoms/pretty-checkbox';
import Header from '../components/Header';
import { CaelusState } from "../store/reducers";
import { useSelector } from "react-redux";

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


const ChecklistPane = () => {
  const currentStage = useSelector((state: CaelusState) =>
  stages.indexOf(state.data.general.stage)
  );
  
  function nextButtonPushed() {
    if (x < 3) {
      x = x + 1;
    }
  }
  
  function backButtonPushed() {
    if (x > 0) {
      x = x - 1;
    }
  }
  
  const checkbox = useCheckboxState();
  
  var firstChecked = false;

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="pane"
    >
      <Header>Checklist: {stageNames[stages[x]]}</Header>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Button onClick={backButtonPushed}> Back </Button> 
        <Button disabled onClick={() => window.location.reload()}>{stageNames[stages[x + 1]]}</Button> 
        <Button onClick={nextButtonPushed}> Next </Button>
      </div>
        {(stageNames[stages[x]] === stageNames[stages[currentStage]]) 
          ?Object.entries(stageParameters[x]).map(([num, step]) => {
            return(
              <Checkbox //locked
                // onClick={checkbox.setState(true)}
                
                style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}}
                animation="jelly" 
                // icon=() add icon if you want
                color='warning'
                shape="round"
                
              >
                {step}
              </Checkbox>
            )
          })
          :Object.entries(stageParameters[x]).map(([num, step]) => {

            //var
            return(
              <Checkbox disabled checked

                onClick={() => firstChecked = true}

                  

                // onChange={() => checkbox.setState(false)}
                // defaultValue=""
                style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}}
                animation="jelly" 
                // icon=() add icon if you want
                shape="round"
              

              >
                {step}
              </Checkbox>
            )
          })
        }
      </div>

  );
};


export default ChecklistPane;
