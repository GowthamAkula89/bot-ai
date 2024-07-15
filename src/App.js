import './App.css';
import MainContainer from './Components/MainContainer/mainContainer';
import DataProvider from './ContextAPI/dataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <MainContainer/>
      </DataProvider>
    </div>
  );
}

export default App;
