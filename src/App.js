import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/strengthChecker";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import { Icon } from '@iconify/react';

export default function App() {
  const [length, setLength] = useState(10);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    alert('text copied');
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };


  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <>
    <div className="pswd_name">Password Generator</div>
    <div className="container">
     
      {password && (
        <div className="header">
          <div className="title">{password}</div>
  
          <Icon icon="cil:copy" color="#a5ffaf" onClick={handleCopy} customClass="copyBtn" style={{cursor:"pointer"}} />
        </div> 
      )}
      </div>
      <br/>
    <div className="container2">
      <div className="charlength">
        <span>
          <label style={{color:"#ffffff",fontFamily:"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="5"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          // className="mySlider"
        />
      </div>
    
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              title={checkbox.title}
              onChange={() => handleCheckboxChange(index)}
              state={checkbox.state}
              className="green-checkbox"
            />
          );
        })}
      </div>
    
      <PasswordStrengthIndicator password={password} />

    
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

     
      <Button
        text="Generate  ->"
        onClick={() => generatePassword(checkboxData, length)}
        customClass="generateBtn"
      
      /> 
      
    </div>
    </>
  );
}