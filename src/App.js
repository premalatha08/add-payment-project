import React, { useEffect, useState } from 'react';
import suppliers from "./data/suppliers.json";
import billsData from "./data/bills.json";
import  PaymentTable from "./components/PaymentTable";

export default function App() {
  const [supplier,setSupplier]=useState("");
  const [bills,setBills]=useState([]);
  const [selectedBills,setselectedBills]=useState([]);
  const [amount,setAmount]=useState("");
  const [payments,setPayments]=useState([]);
  const [showPayment,setShowpayment]=useState(false);




  useEffect(()=>{

    setBills(billsData);
    const stored=JSON.parse (localStorage.getItem("payments")) || [];
    setPayments(stored);
  },[]);
  const supplierBills=bills.filter(b=>b.supplier === supplier);

    const handleSelect =(bill)=>{
    const balance =bill.total-bill.paid;
    const exists=selectedBills.find(b=>b.id === bill.id);

    if (exists){
      setselectedBills(selectedBills.filter(b=>b.id !==bill.id));

    }
    else {
      setselectedBills([
        ...selectedBills,{...bill,balance}
      ]);
    }
  }
  const totalOutstanding=selectedBills.reduce((sum,b)=> sum +b.balance,0);

  const handleSave=()=>{
    if(amount>totalOutstanding){
      alert ("Exceeds outstanding");
      return;
    }
    const newPayment={
      id:Date.now(),
      supplier,
      amount,
      bills:selectedBills
    };

    const updated=[

      ...payments,
      newPayment
    ];

    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
    setSupplier("");
    setselectedBills([]);
    setAmount("");
    alert("saved");
  };
  return (
    <div>
      {!showPayment && (
       <div style={ {textAlign :'center',marginTop:'150px'}}>
        <h1>Day BOOK</h1>
        <button onClick={()=>setShowpayment(true)}>Add payment</button>
       </div>
      )}
      {showPayment && (
        <div style={{width:"400px", margin:'auto', marginTop:'50px', textAlign:'center', border:'1px solid gray', padding:'20px'}}>
          <button onClick={()=> setShowpayment(false)}>Back</button>
        
        <h2>Add payment</h2>
       <select onChange={(e)=> setSupplier(e.target.value)}>
        <option>select Supplier</option>
        {suppliers.map(s=>(
          <option key={s.id}> {s.name}</option>
        ))}
       </select>

       <h3>Bills</h3>
       {supplierBills.map(bill=>{
        const balance=bill.total-bill.paid;

        return(
          <div key={bill.id}>
            <input type='checkbox' onChange={()=>handleSelect(bill)}/>
            {bill.bill_no}
            Balance:{balance}
          </div>
        );
       })}
       <h3>Total{totalOutstanding}</h3>
       <input type=' number' onChange={(e)=>setAmount(e.target.value)}/>
       <button onClick={handleSave}>Save</button>


       <PaymentTable payments={payments}/>
       </div>
      )}
    </div>
  );
}
