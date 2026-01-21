import React from 'react';
import { userColumnItems } from './userColumnItems';

const TableRow = ({ user }) => {
  return (

    <tr>
    { userColumnItems.map((column) => {
      let value;

      if (column.key === "country") value = user.address.country;
      else if (column.key === "city") value = user.address.city;
      else value = user[column.key];

      return (
        <td key={column.key}>
          {value}
        </td>
      )
      }) }
    </tr>
  )
}

export default TableRow;