import './App.css';
import { Routes, Route } from "react-router-dom";
import Navabar from './Components/Navabar';
import { Toaster } from 'react-hot-toast';
import Main from './Components/Main';
import { createContext, useState } from 'react';
import BillModal from './Components/BillModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import Login from './Components/Login';
import { useNavigate } from "react-router-dom";
import RequireAuth from './Components/RequireAuth';
import Register from './Components/Register';
// creating context
export const AppContext = createContext()

function App() {
  const navigate = useNavigate()
  // declaring all the states
  const [searchOptions, setSearchOptions] = useState({ criteria: '', searchInput: '' })
  const [user, setUser] = useState(false)
  const [formInput, setFormInput] = useState(null)
  const [totalBillInfo, setTotalInfo] = useState({ billCount: 0, paidCount: 0 })
  const [pageCountArr, setPageCountArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [currentCondition, setCurrentCondition] = useState('')
  const [bills, setBills] = useState([])
  const [pageData, setPageData] = useState([])

  // a delete function which will recieve a id and delete it
  const handleDelete = async (billId) => {
    setCurrentCondition('deleting')
    setLoading(true)
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: `https://lower-hockey-29859.herokuapp.com/api/delete-billing/${billId}`,
        headers: {
          email: localStorage.getItem('power-hacker-user'),
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      if (data.acknowledged) {
        const billsAfterDelete = bills.filter(bill => bill.id !== billId);
        const deleteBill = bills.find(bill => bill.id === billId)
        setTotalInfo({
          ...totalBillInfo,
          paidCount: totalBillInfo.paidCount - deleteBill.amount
        })
        setBills(billsAfterDelete)
        if (pageData.length === 1) {
          setCurrentPage((prev) => prev - 1)
        }
        setSearchOptions({ criteria: '', searchInput: '' })
        toast.success('Successfully deleted bill from database')
      }
      else {
        toast.error('Something went wrong')
      }
    }
    catch (err) {
      // if any error accurs sending user to login page
      setUser(false)
      localStorage.removeItem('power-hacker-user')
      localStorage.removeItem('token')
      toast.error('Something went wrong, Please Sign in again')
      navigate('/login')
    }
    setCurrentCondition('')
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  // sending all the states and dispatchs into context to extract and use
  return (
    <AppContext.Provider value={{ searchOptions, setSearchOptions, setFormInput, setLoading, currentCondition, setCurrentCondition, bills, setBills, handleDelete, totalBillInfo, setTotalInfo, pageCountArr, setPageCountArr, currentPage, setCurrentPage, loading, pageData, setPageData, user, setUser }}>
      <div className="App">
        <Toaster />
        <Navabar />
        <Routes>
          <Route path="/" element={<RequireAuth><Main /></RequireAuth>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        {/* this modal will open while in both case of updating or adding bill */}
        {formInput && <BillModal formInput={formInput} setLoading={setLoading} setFormInput={setFormInput} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
