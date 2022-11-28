import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {useSelector, useDispatch} from 'react-redux';
import {appSlice} from '../../redux/appSlice';
import {wheelSlice} from '../../redux/wheelSlice';
import './style/wheel.css';
let countofSpins = 0;
export default function Wheel(props) {
    const wheelToggle = useSelector((state)=> state.app.wheelToggle);
    return (
        <Drawer
            anchor='right'
            open={wheelToggle}
            variant="persistent"
            PaperProps={{
                sx: {
                    marginTop: 8,
                    width: 600,
                    height: 600,
                    },
            }}
        >
            <Box>
                <WheelMain trySearchFunc={props.trySearchFunc}></WheelMain>
            </Box>
        </Drawer>
    );
}
function WheelMain(props) {
    const wheelContentsSolo = ['ラーメン', 'カレー', 'ハンバーガー', '牛丼', 'そば', 'ドーナツ', 'うどん', '中華'];
    const wheelContentsParty = ['焼肉', '回転寿司', 'イタリアン', 'ハンバーガー', '中華', '和食', 'ラーメン', 'インド料理'];
    const colorCode = ['#FF6961', '#FFb480', '#F8f38d', '#42d6a4', '#08cad1', '#59adf6', '#9d94ff', '#c780e8'];
    const wheelRadius = 200; // in px
    const wheelRotation = useSelector((state) => state.wheelSlice.wheelRotation);
    const wheelState = useSelector((state) => state.wheelSlice.wheelState);
    const wheelContents = useSelector((state) => state.wheelSlice.wheelContents);
    const dispatch = useDispatch();
    const styleObjectArray = [];
    const degreePerContents = 360 / wheelContents.length;
    const polygon = Math.tan(3.14 / wheelContents.length);
    const sizeofEdge = polygon * wheelRadius;
    wheelContents.forEach((value, index) => {
        let colorCodeTemp = colorCode[index];
        if (colorCodeTemp == undefined) {
            colorCodeTemp = '#FFFFFF';
        };

        const style = {
            'borderWidth': `200px ${sizeofEdge}px 0`,
            'transformOrigin': `${sizeofEdge}px 200px`,
            'left': `${wheelRadius - sizeofEdge}px`,
            'transform': `rotate(${(index) * degreePerContents}deg)`,
            'borderColor': `${colorCodeTemp} transparent`,
        };

        styleObjectArray.push(style);
    });


    const wheelSpin = () => {
        if (wheelState == 1) {
            // the Whell is spinning!
            return;
        }
        countofSpins+=1;
        const rndSpin = Math.floor(Math.random() * (360)) + 1;
        const newSpin = (5000 * countofSpins) + rndSpin;
        dispatch(wheelSlice.actions.setWheelState(1));
        dispatch(wheelSlice.actions.setRotation(newSpin));
        setTimeout(() => {
            dispatch(wheelSlice.actions.setWheelState(0)); getResult(newSpin);
        }, 10000);
    };
    const getResult = (spin) => {
        let resultDegree = spin % 360; // clamping WheelRotation to 0 between 360
        const degreePerContent = 360 / wheelContents.length; // the size of each pies
        resultDegree -= degreePerContent / 2; // handling negative numbers
        resultDegree = 360 - resultDegree;
        let temp = resultDegree / degreePerContent;
        temp = Math.floor(temp);
        const result = wheelContents[temp];
        dispatch(appSlice.actions.handleInputField(result));
        dispatch(appSlice.actions.toggleWheel());
        props.trySearchFunc(result);
    };
    const setToSolo = () => {
        if (wheelState == 1) {
            // the Whell is spinning!
            return;
        }
        dispatch(wheelSlice.actions.setContents(wheelContentsSolo));
    };
    const setToParty = () => {
        if (wheelState == 1) {
            // the Whell is spinning!
            return;
        }
        dispatch(wheelSlice.actions.setContents(wheelContentsParty));
    };
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
    );
}
