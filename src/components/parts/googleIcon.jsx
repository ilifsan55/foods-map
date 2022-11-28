import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import Googleicon from '../../images/googlemap.png';
import GoogleiconGray from '../../images/googlemap_grayscale.png';
export function GoogleIcon(props) {
  return (
    <SvgIcon
      component="span"
      sx={{transform: `scale(${props.size})`}}>
      {props.checked ?
        <img src={GoogleiconGray} alt='photo' width='24' height='24'></img> :
        <img src={Googleicon} alt='photo' width='24' height='24'></img>
      }
    </SvgIcon>
  );
};
