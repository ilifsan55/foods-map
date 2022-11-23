import React from "react";
import SvgIcon from '@mui/material/SvgIcon';
import HotPeppericon from '../../images/hotpepper.png';
import HotPeppericonGray from '../../images/hotpepper_grayscale.png';


export function HotPepperIcon(props) {
  return (
    <SvgIcon
      component="span"
      sx={{transform: `scale(${props.size})`}}>
      
      {props.checked ? 

        <img src={HotPeppericonGray} alt="photo" width="24" height="24"></img> 
        :
        <img src={HotPeppericon} alt="photo" width="24" height="24"></img>
      }
      
    </SvgIcon>
  );
};