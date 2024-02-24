import React, { useState } from 'react';

function Order() {
  const [items, setItems] = useState([
    { id: 1, date: "12/2/2024", name: 'omkar', cost: 200},
    { id: 2, date: "5/2/2024", name: 'Deepak', cost: 200},
    { id: 3, date: "13/1/2024", name: 'Chetan', cost: 200}
  ]);

  

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td>{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;