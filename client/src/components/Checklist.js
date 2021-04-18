import React, {useState, useEffect} from 'react';

const Checklist = () => {
  const [toggle, setToggle] = useState(localStorage.getItem('toggle') === "true")

  useEffect(() => {
    localStorage.setItem('toggle', toggle)
  }, [toggle]);

  return (
    
    <div>
      <input 
        onClick={() => {
          setToggle(!toggle)  
        }}
        checked={toggle}
        type="checkbox"
        style={{ fontSize: "20px", marginBottom: 5, marginTop: 8, marginLeft: 20 }}  
      /> 
      <label>It WORKSSSSSS</label>
        {toggle ? <p>Yay</p>: null}
    </div>  
  );
};

export default Checklist;
