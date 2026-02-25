import React from 'react'

export default function Paymentsmodal({data,close}) {
    if(!data) return null;
  return (
    <div style={ {position:'fixed', right:0, top:0, width:'300px',height:'100%', background:'#eee',padding:'20px'}}>
        <h3>Details</h3>
        <p>Supplier : {data.supplier}</p>
        <p>
            Amount:{data.amount}
        </p>
        <h4>Bills</h4>
     {data.bills.map(b=>(
        <div key={b.id}>
            {b.bill_no}-{b.balance}
        </div>
        ))}
        <button onClick={close}>Close</button>
    </div>
  );
}
