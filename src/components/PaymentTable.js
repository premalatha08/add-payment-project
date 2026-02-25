import React, { useState } from 'react';
import Paymentsmodal from './Paymentsmodal';


export default function PaymentTable({payments}) {
  const [selected,setSelected]=useState(null);
  return (
    <div>
      <h2>PaymentTable</h2>
      <table border="1"  style={{marginLeft:'90px'}}>
        <tr>
          <th>Supplier</th>
          <th>Amount</th>
        </tr>
        {payments.map(p=>(
          <tr onClick={()=>setSelected(p)}>
            <td>{p.supplier}</td>
            <td>{p.amount}</td>
          </tr>
        ))}
      </table>
      {selected && (
        <div style={{width:"50px", padding:'20px',}}>
            <h3>Modal</h3>
            <p>Supplier:{selected.supplier}</p>
            <p> Amount:{selected.amount}</p>

        <button onClick={()=>setSelected(null)}>Close</button>    
        </div>

      )}
      
      </div>
  );
}
