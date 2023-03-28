import './App.css';
import Table from './components/Table';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <div> Projeto Star wars: Trybe</div>
      <Table />
    </AppProvider>
  );
}

export default App;
