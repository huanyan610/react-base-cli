import { createStore, applyMiddleware } from 'redux'; //  引入createStore方法
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers(), composeWithDevTools(applyMiddleware(thunk))); // 创建数据存储仓库
export default store; //暴露出去
