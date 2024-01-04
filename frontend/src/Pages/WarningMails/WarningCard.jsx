import React, { useState } from 'react';
import './warningcard.css';
import { Button, Typography } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { PopupMailServices } from '../../Services/WarningMailServices/PopupMailServices';
import Profile from '../user-module/Profile';

const WarningCard = (props) => {

  const empId = localStorage.getItem("id");
  const navigateToUrl = `../user/particular-employees-warning-mails?empId=${empId}`;
  const warningMailIds = props.props.map((item) => item.warningMailId);
  const titles = props.props.map((item) => item.title);
  const numberOfTitles = titles.length;

  const [clickCount, setClickCount] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(true); // State to control card visibility

  let fucc=props.onClose
  const handleOkClick = () => {
    fucc()
    
    PopupMailServices.markAsRead(warningMailIds).then((res) => {
      if (res.status === 200) {
        setClickCount((prevCount) => prevCount + 1);
        if (clickCount === 2) {
          window.location.reload();
        } else {
          setIsCardVisible(false); // Hide the card after OK is clicked
        }
      }
    });
  };

const handlePut=(e)=>{
  fucc()
  PopupMailServices.markAlertMailsAsReadAsUpdate(warningMailIds).then((res)=>{
    if(res.status===200){
      console.log('success')
      setIsCardVisible(false)
    }
  })
}



  return (
    // Conditionally render the card based on the isCardVisible state
    isCardVisible && (
      <div className="cards">
        <div style={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
       
       <div style={{display:"flex",justifyContent:"space-between",alignContent:"center",alignItems:"center"}}>
       <AnnouncementIcon className='icon' sx={{width:'100px',height:'60px'}} /> 
       
        
       {numberOfTitles > 0 && (
       <div className="title-count">{numberOfTitles}</div>
     )}
       </div>

     
  
  </div>
        <div className='mail'><Typography>Warning Mail</Typography></div>
        <div className="card-content">
       {/* Map through titles and render each one in a separate <p> tag */}
       {titles.map((title, index) => (
            <p key={index} className="card-description">
            
               
            <span className="subject">subject :</span> {title}
            
            </p>
          ))}
        <a href={navigateToUrl} target="_blank" rel="noopener noreferrer" className="card-link" onClick={handlePut}><Button>click here</Button></a>
     
         
          <div className='ok'>
            <Button className="small-button" variant="contained" onClick={handleOkClick}>OK</Button>
          </div>
        </div>
      </div>
    )
  );
};

export default WarningCard;
