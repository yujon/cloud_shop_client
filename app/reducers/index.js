import { combineReducers } from 'redux';

import commonReducer from './common';
import userReducer from './user';
import commodityReducer from './commodity';
import categoryReducer from './category';
import marketReducer from './market';
import shopReducer from './shop';
import orderReducer from './order';

const createRootReducer = (navReducer) => {
	return combineReducers({
		nav: navReducer,
		common:commonReducer,
		user: 	 userReducer,
        commodity: 	 commodityReducer,
        category:categoryReducer,
        market : marketReducer,
        shop: shopReducer,
        order: orderReducer,
	});
}

export default createRootReducer