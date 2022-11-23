import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { appSlice } from '../../redux/appSlice';
import { wheelSlice } from '../../redux/wheelSlice';
import './style/wheel.css'

let countofSpins = 0;

export default function Wheel(props) {


    let wheelToggle = useSelector(state => state.app.wheelToggle);
    return (

        <Drawer
            anchor='right'
            open={wheelToggle}
            variant="persistent"
            PaperProps={{
                sx: {
                    marginTop: 8,
                    width: 600,
                    height:600                }
            }}
        >

            <Box>
                <WheelMain trySearchFunc={props.trySearchFunc}></WheelMain>
            </Box>
        </Drawer>

    )


}

function WheelMain(props) {

    useEffect(() => {

        
    })

    const wheelContentsSolo = ['ラーメン', 'カレー', 'ハンバーガー', '牛丼', 'そば', 'ドーナツ', 'うどん', '中華'];
    const wheelContentsParty = ['焼肉', '回転寿司', 'イタリアン', 'ハンバーガー', '中華', '和食', 'ラーメン', 'インド料理'];


    const colorCode = ['#FF6961', '#FFb480', '#F8f38d', '#42d6a4', '#08cad1', '#59adf6', '#9d94ff', '#c780e8'];
    const wheelRadius = 200; // in px


    let wheelRotation = useSelector(state => state.wheelSlice.wheelRotation);
    let wheelState = useSelector(state => state.wheelSlice.wheelState);
    let wheelContents = useSelector(state => state.wheelSlice.wheelContents);
    const dispatch = useDispatch();

    let styleObjectArray = [];
    let degreePerContents = 360 / wheelContents.length;
    let polygon = Math.tan(3.14 / wheelContents.length);
    let sizeofEdge = polygon * wheelRadius;

    wheelContents.forEach((value, index) => {

        let colorCode_temp = colorCode[index]
        if (colorCode_temp == undefined) {
            colorCode_temp = '#FFFFFF';
        }

        let style = {
            'borderWidth': `200px ${sizeofEdge}px 0`,
            'transformOrigin': `${sizeofEdge}px 200px`,
            'left': `${wheelRadius - sizeofEdge}px`,
            'transform': `rotate(${(index) * degreePerContents}deg)`,
            'borderColor': `${colorCode_temp} transparent`
        }

        styleObjectArray.push(style);
    })


    const wheelSpin = () => {

        if (wheelState == 1) {
            //the Whell is spinning!
            return;
        }

        countofSpins+=1;
        let newSpin = 5000 * countofSpins;
        console.log(newSpin);
        let rndSpin = Math.floor(Math.random() * (360)) + 1;
        let intervalID = setTimeout(() => { dispatch(wheelSlice.actions.setWheelState(0)); getResult(); }, 10000)
        dispatch(wheelSlice.actions.setWheelState(1))
        dispatch(wheelSlice.actions.setRotation(newSpin + rndSpin));

    }
    
    const getResult = () => {
        
        let resultDegree = wheelRotation % 360;
        let degreePerContent = 360 / wheelContents.length;
        resultDegree -= degreePerContent / 2;
        let result = 'Error';
    
        resultDegree = 360 - resultDegree;
    
        let temp = resultDegree / degreePerContent;
    
        temp = Math.floor(temp);
        result = wheelContents[temp];

        dispatch(appSlice.actions.handleInputField(result));
        dispatch(appSlice.actions.toggleWheel());
        props.trySearchFunc();
        console.log(result);
    

      

    }


    const setToSolo = () => {
        if (wheelState == 1) {
            //the Whell is spinning!
            return;
        }
        dispatch(wheelSlice.actions.setContents(wheelContentsSolo));
    }
    const setToParty = () => {
        if (wheelState == 1) {
            //the Whell is spinning!
            return;
        }
        dispatch(wheelSlice.actions.setContents(wheelContentsParty));
    }

    return (
        <div id='wrapper'>
            <div id='buttonholder'>
                <span onClick={setToSolo} id='button-1'>一人で</span>
                <span onClick={setToParty} id='button-2'>みんなで</span>
            </div>
            <div id='tri'></div>
            <div id='wheel' onClick={wheelSpin}>
                <div id='inner-wheel' style={{
                    transform: `rotate(${wheelRotation}deg)`,
                }}>
                    {wheelContents.map((value, index) => <div style=
                        {styleObjectArray[index]}
                        key={index}
                        id={`content${index}`}>
                        <span>{value}</span></div>)}
                </div>
                <div id='mid-wheel' >
                </div>
            </div>
        </div>
    )
}