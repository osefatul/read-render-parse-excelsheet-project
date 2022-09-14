import React, { useState } from 'react';

function CSVFILE() {

    const [csvFile, setCsvFile] = useState(null);
    const [array, setArray] = useState([]);
    const fileReader = new FileReader();

    const handleFile = (e) =>{
        e.preventDefault();
        setCsvFile(e.target.files[0]);
    }

    const textToArray = (string) =>{
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
    
        setArray(array);
    };

    const handleClick = (e) =>{
        e.preventDefault();

        if(csvFile){
            fileReader.onload = (e) =>{
                const csvRes = e.target.result;
                // console.log(csvRes)
                textToArray(csvRes)
            }
            fileReader.readAsText(csvFile)
        }
    }

    const headerKeys = Object.keys(Object.assign({}, ...array));
    // const headerValues = Object.assign({}, ...array);
    // console.log( headerValues)
    // console.log(headerKeys)

return (
    <div>
        <form>
            <input type="file" accept='.csv' onChange={(e)=> handleFile(e)} />
            <button onClick = {e => handleClick(e)}>
                Import
            </button>
        </form>

        <br />

        <table>
            <thead>
                <tr key={"header"}>
                {headerKeys.map((key) => (
                    <th>{key}</th>
                ))}
                </tr>
            </thead>

            <tbody>
                {array.map((item) => (
                <tr key={item.id}>
                    {Object.values(item).map((val) => (
                    <td>{val}</td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>

    </div>
)
}

export default CSVFILE