const TableHeaderCell = ({ children }) => {
    return (
      <th className="border border-gray-200 p-2 bg-primary text-white">
        {children}
      </th>
    );
  };
  
  export default TableHeaderCell;