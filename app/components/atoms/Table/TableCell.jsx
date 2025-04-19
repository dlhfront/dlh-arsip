const TableCell = ({ children, className = "" }) => {
    return (
      <td className={`border border-gray-200 p-2 h-12 max-w-xs truncate ${className}`}>
        {children}
      </td>
    );
  };
  
  export default TableCell;