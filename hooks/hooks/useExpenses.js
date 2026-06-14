import { useState, useMemo } from "react";
import { todayString, getDateParts, DEFAULT_BUDGETS } from "../constants";
const DEMO = [
  { id:1, amount:450,  category:"food",          note:"Lunch at restaurant", date:todayString() },
  { id:2, amount:1200, category:"transport",      note:"Monthly metro pass",  date:todayString() },
  { id:3, amount:3500, category:"shopping",       note:"New shoes",           date:todayString() },
  { id:4, amount:800,  category:"bills",          note:"Electricity bill",    date:todayString() },
  { id:5, amount:250,  category:"food",           note:"Groceries",           date:todayString() },
  { id:6, amount:999,  category:"entertainment",  note:"OTT subscription",    date:todayString() },
];
export function useExpenses() {
  const [expenses,setExpenses] = useState(DEMO);
  const [budgets,setBudgets]   = useState(DEFAULT_BUDGETS);
  const [filterMonth,setFilterMonth] = useState(new Date().getMonth());
  const [filterYear,setFilterYear]   = useState(new Date().getFullYear());
  const monthExpenses = useMemo(()=>expenses.filter(e=>{ const {month,year}=getDateParts(e.date); return month===filterMonth&&year===filterYear; }),[expenses,filterMonth,filterYear]);
  const yearExpenses  = useMemo(()=>expenses.filter(e=>getDateParts(e.date).year===filterYear),[expenses,filterYear]);
  const todayExpenses = useMemo(()=>expenses.filter(e=>e.date===todayString()),[expenses]);
  const monthTotal  = useMemo(()=>monthExpenses.reduce((s,e)=>s+e.amount,0),[monthExpenses]);
  const yearTotal   = useMemo(()=>yearExpenses.reduce((s,e)=>s+e.amount,0),[yearExpenses]);
  const todayTotal  = useMemo(()=>todayExpenses.reduce((s,e)=>s+e.amount,0),[todayExpenses]);
  const categoryTotals = useMemo(()=>{ const t={}; monthExpenses.forEach(e=>{t[e.category]=(t[e.category]||0)+e.amount;}); return t; },[monthExpenses]);
  const monthlyData = useMemo(()=>{ const d=Array(12).fill(0); yearExpenses.forEach(e=>{d[getDateParts(e.date).month]+=e.amount;}); return d; },[yearExpenses]);
  const addExpense    = exp => setExpenses(prev=>[{...exp,id:Date.now()},...prev]);
  const deleteExpense = id  => setExpenses(prev=>prev.filter(e=>e.id!==id));
  const updateBudget  = (cat,amt) => setBudgets(prev=>({...prev,[cat]:amt}));
  const prevMonth = () => { if(filterMonth===0){setFilterMonth(11);setFilterYear(y=>y-1);}else setFilterMonth(m=>m-1); };
  const nextMonth = () => { if(filterMonth===11){setFilterMonth(0);setFilterYear(y=>y+1);}else setFilterMonth(m=>m+1); };
  return { expenses,budgets,filterMonth,filterYear,monthExpenses,yearExpenses,todayExpenses,monthTotal,yearTotal,todayTotal,categoryTotals,monthlyData,addExpense,deleteExpense,updateBudget,prevMonth,nextMonth };
   }
