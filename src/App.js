import { useState } from 'react';
import './App.css';
import DataTable from './components/DataTable';
import Header from './components/Header';
import InputFileUpload from './components/Input';

function App() {
  const [finalData, setFinalData] = useState([]);

  return (
    <div className="App">
       <Header />
       <InputFileUpload finalData={finalData}  setFinalData={setFinalData} />
       {finalData?.length > 0 && 
        <DataTable finalData={finalData} setFinalData={setFinalData} />
       }
    </div>
  );
}

export default App;
