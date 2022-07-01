import './App.css';
import { Routes, Route } from "react-router-dom";
import Navabar from './Components/Navabar';
import { Toaster } from 'react-hot-toast';
import Main from './Components/Main';
import { createContext, useEffect, useState } from 'react';
import BillModal from './Components/BillModal';
import Loader from './Components/Loader';
import axios from 'axios';
import toast from 'react-hot-toast';
export const AppContext = createContext()

function App() {
  const [searchOptions, setSearchOptions] = useState({ criteria: '', searchInput: '' })
  const [formInput, setFormInput] = useState(null)
  const [totalBillInfo, setTotalInfo] = useState({ billCount: 0, paidCount: 0 })
  const [pageCountArr, setPageCountArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [currentCondition, setCurrentCondition] = useState('')
  const [bills, setBills] = useState([])
  const [pageData, setPageData] = useState([])
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
  useEffect(() => {
    const getBillInfo = async () => {
      const { data } = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/all-bills-info'
      })
      setTotalInfo(data)
      const initalArr = []
      for (let i = 1; i <= Math.ceil(data?.billCount / 10); i++) {
        initalArr.push(i)
      }
      setPageCountArr(initalArr)
    }
    getBillInfo()
  }, [bills])
  useEffect(() => {
    const getMaxTen = async () => {
      setLoading(true)
      const { data } = await axios({
        method: 'GET',
        url: `http://localhost:5000/api/bills-max-ten?currentpage=${currentPage}&${searchOptions.criteria}=${searchOptions.searchInput}`,
      })
      const initalArr = []
      if (searchOptions.searchInput) {
        const actual = bills.filter(b => b[searchOptions.criteria] === searchOptions.searchInput)
        for (let i = 1; i <= Math.ceil(actual.length / 10); i++) {
          initalArr.push(i)
        }
      }
      else {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:5000/api/all-bills-info'
        })
        for (let i = 1; i <= Math.ceil(data?.billCount / 10); i++) {
          initalArr.push(i)
        }
      }
      setPageCountArr(initalArr)
      setPageData(data)
      setLoading(false)
    }
    getMaxTen()
  }, [bills, currentPage, searchOptions])
  const handleDelete = async (billId) => {
    setCurrentCondition('deleting')
    setLoading(true)
    const { data } = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/delete-billing/${billId}`
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
    setCurrentCondition('')
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  return (
    <AppContext.Provider value={{ searchOptions, setSearchOptions, setFormInput, setLoading, currentCondition, setCurrentCondition, bills, setBills, handleDelete, totalBillInfo, setTotalInfo, pageCountArr, setPageCountArr, currentPage, setCurrentPage, loading, pageData, setPageData }}>
      <div className="App">
        <Toaster />
        <Navabar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
        {formInput && <BillModal formInput={formInput} setLoading={setLoading} setFormInput={setFormInput} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
