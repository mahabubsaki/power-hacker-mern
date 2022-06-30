import './App.css';
import { Routes, Route } from "react-router-dom";
import Navabar from './Components/Navabar';
import { Toaster } from 'react-hot-toast';
import Main from './Components/Main';
import { createContext, useEffect, useState } from 'react';
import BillModal from './Components/BillModal';
import Loader from './Components/Loader';
import axios from 'axios';
export const AppContext = createContext()

function App() {
  const [criteria, setCriteria] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [formInput, setFormInput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentCondition, setCurrentCondition] = useState('')
  const [bills, setBills] = useState([])
  useEffect(() => {
    const getBillings = async () => {
      const { data } = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/billing-list'
      })
      setBills(data)
    }
    getBillings()
  }, [])
  const handleFilter = () => {
    alert('sds')
  }
  const handleDelete = (billId) => {

  }
  return (
    <AppContext.Provider value={{ criteria, setCriteria, setSearchInput, handleFilter, setFormInput, setLoading, currentCondition, setCurrentCondition, bills, setBills, handleDelete }}>
      <div className="App">
        <Toaster />
        <Navabar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
        {formInput && <BillModal formInput={formInput} setLoading={setLoading} setFormInput={setFormInput} />}
        {loading && <Loader>{currentCondition === 'adding' ? 'Genereting Id' : 'Updating Bill'}</Loader>}
      </div>
    </AppContext.Provider>
  );
}

export default App;
