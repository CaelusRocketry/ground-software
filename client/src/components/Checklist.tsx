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






const Checklist = () => {

  const checkbox = useCheckboxState();

  function handleClick() {
    if(!checkbox.state) {

    }
  }
  
  const waitingChecklist = [
    <>
      <Checkbox id="1" style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.waiting[1] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.waiting[2] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.waiting[3] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.waiting[4] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.waiting[5] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.waiting[6] }</Checkbox>  
    </>
  ]
  
  const pressurizationChecklist = [
    <>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.pressurization[1] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.pressurization[2] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.pressurization[3] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.pressurization[4] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.pressurization[5] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.pressurization[6] }</Checkbox>
    </>
  ]
  
  const autosequenceChecklist = [
    <>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.autosequence[1] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.autosequence[2] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.autosequence[3] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.autosequence[4] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.autosequence[5] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.autosequence[6] }</Checkbox>
    </>
  ]
  
  const postburnChecklist = [
    <>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.postburn[1] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.postburn[2] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.postburn[3] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.postburn[4] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.postburn[5] }</Checkbox>
      <Checkbox style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}} animation="jelly" color='warning' shape="round">{ config.checklist.postburn[6] }</Checkbox>
    </>
  ]

  return (
    <>
      




      

    </>
  );
};

export default Checklist;