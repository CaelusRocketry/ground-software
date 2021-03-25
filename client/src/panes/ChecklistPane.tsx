import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox } from 'pretty-checkbox-react';

import config from "../config.json";

import '@djthoms/pretty-checkbox';
import Header from '../components/Header';

const ChecklistPane = () => {

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="pane"
      >
      <Header>Timeline</Header>
        <Checkbox 
        style={{ fontSize: "20px", marginBottom: 20, marginTop: 8}}
        animation="jelly" 
        // icon=() add icon if you want
        color="success"
        shape="round"
        //variant="fill"
        >{config.checklist.Step_1}</Checkbox>


        <Checkbox 
        style={{ fontSize: "20px", marginBottom: 20}}
        animation="jelly" 
        // icon=() add icon if you want
        color="success"
        shape="round"
        //variant="fill"
        >{config.checklist.Step_2}</Checkbox>


        <Checkbox 
        style={{ fontSize: "20px", marginBottom: 20}}
        animation="jelly" 
        // icon=() add icon if you want
        color="success"
        shape="round"
        //variant="fill" 
        >{config.checklist.Step_3}</Checkbox>


        <Checkbox 
        style={{ fontSize: "20px", marginBottom: 20}}
        animation="jelly" 
        // icon=() add icon if you want
        color="success"
        shape="round"
        //variant="fill" 
        >{config.checklist.Step_4}</Checkbox>


        <Checkbox 
        style={{ fontSize: "20px", marginBottom: 20}}
        animation="jelly" 
        // icon=() add icon if you want
        color="success"
        shape="round"
        variant="fill" 
        >{config.checklist.Step_5}</Checkbox> 


        <Checkbox 
        style={{ fontSize: "20px", marginBottom: 20}}
        animation="jelly" 
        // icon=() add icon if you want
        color="success"
        shape="round"
        variant="fill" 
        >{config.checklist.Step_6}</Checkbox> 

      </div>
    </>
    

  );
};

export default ChecklistPane;
