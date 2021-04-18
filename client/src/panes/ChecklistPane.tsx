import React from 'react';
import styled from 'styled-components';


import config from "../config.json";
import { stages, stageNames } from "../lib/locationNames";
import '@djthoms/pretty-checkbox';
import Header from '../components/Header';
import { CaelusState } from "../store/reducers";
import { useSelector } from "react-redux";
import Checklist from "../components/Checklist";

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

  // handleFormSubmit = () => {
  //   const { user, rememberMe } = state;
  //   localStorage.setItem('rememberMe', rememberMe);
  //   localStorage.setItem('user', rememberMe ? user : '');
  // };

  // const checkbox = useCheckboxState();

    

  // const [checkboxState, setCheckboxState] = useState([ "false", "false", "false" ]);   

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
      <Header>Checklist: {stageNames[stages[x]]}</Header>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Button onClick={backButtonPushed}> Back </Button>
        <Button disabled onClick={() => window.location.reload()}>{stageNames[stages[x + 1]]}</Button>
        <Button onClick={nextButtonPushed}> Next </Button>
      </div>
    
      <Checklist />

      {/* {(stageNames[stages[x]] === stageNames[stages[currentStage]])
        ? Object.entries(stageParameters[x]).map(([num, step]) => {
          localStorage.setItem('check', "0")
          return (
            <input //locked
              // onClick={checkbox.setState(true)}
              className="Question__answer-checkbox"
              // checked={true}localStorage.setItem('rememberMe', rememberMe);

              onClick={() => {

                localStorage.setItem("true", checkboxState);
                console.log("checkbox stored" + checkboxState);
              }}



              type="checkbox"
              value={step}
              // onChange={this.props.setAnswer}
              //defaultChecked={ }
              style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20 }}
            // animation="jelly" 
            // icon=() add icon if you want
            // color='red'
            // shape="round"

            />

          )
        })
        : Object.entries(stageParameters[x]).map(([num, step]) => {

          //var
          return (
            <Checkbox disabled checked

              onClick={() => {
                firstChecked = true

                localStorage.setItem('first', firstChecked.toString());

              }}




              // onChange={() => checkbox.setState(false)}
              // defaultValue=""
              style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20 }}
              animation="jelly"
              // icon=() add icon if you want
              shape="round"


            >
              {step}
            </Checkbox>
          )
        }) 
      } */}
    </div>

  );
};


export default ChecklistPane;
