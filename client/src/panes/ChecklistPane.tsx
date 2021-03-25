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
      <Header>Checklist</Header>
          {Object.entries(config.checklist).map(([num, step]) => {
            return(
              <Checkbox 
                style={{ fontSize: "20px", marginBottom: 20, marginTop: 8, marginLeft: 20}}
                animation="jelly" 
                // icon=() add icon if you want
                color="warning"
                shape="round"
                //variant="fill"
              >
                {step}
              </Checkbox>
            )
          })}

        </div>

    </>
    

  );
};

export default ChecklistPane;
