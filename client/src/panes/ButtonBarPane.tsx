import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

//Come up with style for words in buttons later

const priorityDist = {
    marginLeft: '25px',
    marginTop: '10px'
};

const openDist = {
    marginLeft: '40px',
    marginTop: '10px'
};

const pulseDist = {
    marginLeft: '70px',
    marginTop: '10px'
};

const resetDist = {
    marginLeft: '85px',
    marginTop: '10px'
};

const ButtonBar = () => {
    return(

        <div>

            <Text style={marginLeft: '10px', marginTop: '10px'}>NCSV-1</Text>

            //https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
            //https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/


            <button
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:100,
                    height:100,
                    backgroundColor:'#8DE4FF',
                    borderRadius:50,
                  }, {openDist}}  
            >
                OPEN
            </button>


            <button
                style={
                    marginLeft: '55px',
                    marginTop: '10px'
                  }
            >
                CLOSE
            </button>


            <button
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:100,
                    height:100,
                    backgroundColor:'#10F5E1',
                    borderRadius:50,
                  }, {pulseDist}}  
            >
                PULSE
            </button>

            <button
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:100,
                    height:100,
                    backgroundColor:'#FF5050',
                    borderRadius:50,
                  }, {resetDist}}  
            >
                RESET
            </button>

        </div>
    );

};

export default ButtonBar;