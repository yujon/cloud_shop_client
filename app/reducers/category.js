import * as categoryConf from '../constants/category.js';

const initState = {

}

export default function categoryReducer(state = initState, action){
	var newState;
	if(action.type in categoryConf){
       newState = {
       	...state,
        ...(action.payload || {})
       }
	}else{
		newState = state;
	}
  return newState;
}