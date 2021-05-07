import React, { useState, useEffect } from 'react';
import './App.css';
import DataTable from './components/dataTable';

function App() {
  const [data, setData] = useState([]); // All our data
  const [query, setQuery] = useState(''); //some value on input
  const [searchColumn, setSearchColumn] = useState(['id', 'name']); //our choice of checkbox

  //Getting data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  //getting data by filter
  function search(rows) {
    return rows.filter(
      (row) =>
        searchColumn.some(
          (column) => row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1,
        ),
      /* row.name.toLowerCase().indexOf(query)> -1 ||
      row.id.toString().indexOf(query)> -1*/
    );
  }
  //colums names
  const columns = data[0] && Object.keys(data[0]);

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
       
        {columns &&
          columns.map((column) => (
            <label style={{ paddingLeft: '30px' }}>
              <input
                type="checkbox"
                checked={searchColumn.includes(column)}
                onChange={(e) => {
                  const checked = searchColumn.includes(column);
                  setSearchColumn((prev) =>
                    checked ? prev.filter((sc) => sc !== column) : [...prev, column]
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <div>
        <DataTable data={search(data)} />
      </div>
    </div>
  );
}

export default App;
