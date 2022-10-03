import React from "react";
import './styles.css';
import { TableWithoutIntervalClass } from "../../utils/Probabilidade/TableWithoutIntervalClass";


export default function Table() {


    const { rows, footer, header, precision } = TableWithoutIntervalClass(
        [1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4,
            4, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6,
            6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7,
            7, 8, 8, 8, 8, 8, 8, 9, 9, 9], 2);

    console.log(footer)


    return (
        <table>
            <thead>
                <tr>
                    {
                        header.map((headerName, key) => (
                            <th key={key}>{headerName}</th>
                        ))
                    }
                </tr>
            </thead>

            <tbody>
                {
                    rows.map((row, key) => (
                        <tr key={key}>
                            {
                                row.map((column, key) => (
                                    <td key={key}>{column.toFixed(precision)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>

            <tfoot>
                <tr>
                    {
                        Object.keys(footer).map((key, index) => (
                            <th key={index}>{!!footer[key].toFixed ? footer[key].toFixed(precision) : footer[key]}</th>
                        ))
                    }
                </tr>
            </tfoot>
        </table >
    )
}