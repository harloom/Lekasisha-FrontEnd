import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import  {categorys} from './category.reducer';
import {products} from './products.reducer';
import {banners} from './banner.reducer';
import {orders} from './orders.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  categorys,
  products,
  banners,
  orders,
});

export default rootReducer;