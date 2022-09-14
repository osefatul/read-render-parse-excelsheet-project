import './App.css';
import React, { useState } from 'react';
import * as XLSX from "xlsx";

function App() {

  const [fileName, setFileName] = useState (null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const handleFile = async (e) =>{
    e.preventDefault();

    const excelFile = e.target.files[0];
    setFileName(excelFile.name);

    const data  = await excelFile.arrayBuffer(); //convert file into unformatted array
    const workBook = XLSX.read(data,
          // {sheetRows: 5} // only first 5 rows
    ) 

    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(workSheet, {
      header: 1, // Mark first array as header
      defval: ""
    });

    setColumns(jsonData[0]) //set Columns
    setRows(jsonData.slice(1)) //set Rows
  }


  return (
    <div className="App">
      <div>

        <h1>
        Parse Excel sheet
        </h1>

            {fileName && 
            <h1>
            {fileName}
            </h1>}
        
        <input type="file" onChange={(e)=> handleFile(e)} />
      </div>

      
      <div 
      // className="columns"
      >
        <table>
          <thead>
            <tr key={"23452345"}>
              {columns.map((header)=>(
              <th  >
                {header}
              </th>
              ))}
            </tr>
          </thead>



          <tbody>
            {/* Map an Array of rows */}
            {rows.map((row)=>(
              <tr key= "1234123" className="" >
                  {
                    // Map an array of a row 
                    row.map((cell)=>(
                  // IF a cell includes http then make it a url anchor. otherwise   render just a plain string
                  <td>
                  { cell.toString().includes("http")?
                      <a href={`${cell}`}>
                        {cell}
                      </a>
                    : 
                      <p className="">
                        {
                        cell
                        }
                      </p>
                      }
                  </td>
                      ))
                  }
                  
              </tr>
                
            ))}
        </tbody>


        </table>
      </div>
        
      </div>
  );
}

export default App;
