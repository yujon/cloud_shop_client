import * as commonConf from '../constants/common.js';

const initState = {

}

export default function commonReducer(state = initState, action){
	var newState;
	if(action.type in commonConf){
       newState = {
       	...state,
        ...(action.payload || {})
       }
	}else{
		newState = state;
	}
  return newState;
}