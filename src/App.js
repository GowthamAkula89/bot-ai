import './App.css';
import MainContainer from './Components/MainContainer/mainContainer';
//import DataProvider from './ContextAPI/dataContext';
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainContainer/>
      </Provider>
    </div>
  );
}

export default App;
