import { combineReducers } from 'redux';
import counter from './counter';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    counter
});

export default rootReducer;
