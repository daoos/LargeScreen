import '../../vandor/jquery.MyDigitClock.js';
import temp from './time.html';
// import 'normalize.css';

import './time.css';


export default class Time {

    render(node) {
        $(node).append(temp);
        $("#clock1").MyDigitClock({
            fontSize:20, 
            // fontFamily:"Century gothic", 
            fontColor: "#01dbff", 
            fontWeight:"bold", 
            // bAmPm:true,
            background:'transparent',
            bShowHeartBeat:true
        });
    }


}