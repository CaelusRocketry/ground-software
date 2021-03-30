import React from "react";

//Come up with style for words in buttons later

const wordDist = {
    marginLeft: '10px',
    marginTop: '10px'
};

const priorityDist = {
    marginLeft: '25px',
    marginTop: '10px'
};

const openDist = {
    marginLeft: '40px',
    marginTop: '10px'
};

const closeDist = {
    marginLeft: '55px',
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

const ButtonBar = () => (

    return(

        <div>

            <Text style={wordDist}>NCSV-1</Text>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="mt-2 col-md-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-900" style={priorityDist}>
                    Priority
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Warn</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Critical</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


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
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:100,
                    height:100,
                    backgroundColor:'#CACACA',
                    borderRadius:50,
                  }, {closeDist}}  
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

);

export default ButtonBar;