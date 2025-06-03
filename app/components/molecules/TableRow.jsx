import TableCell from "../atoms/Table/TableCell";
import EditButton from "../molecules/EditButton";
import DeleteButton from "../molecules/DeleteButton";
import { useRouter } from "next/navigation";

const TableRow = ({ 
  record, 
  currentUser, 
  columns, 
  onRowClick,
  docType,
}) => {
  const router = useRouter();

  const handleDeleteSuccess = () => {
    router.replace(`/dashboard/${docType}`);
  };

  const renderCellContent = (record, column) => {
    if (column.render) {
      return column.render(record);
    }
    
    const value = record[column.key];
    if (value == null) return "";
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
  };

  // Handle row click
  const handleRowClick = (e, id) => {
    // Check if the click originated from a button or action element
    const isActionClick = e.target.closest('button, a, [data-no-row-click]');
    if (!isActionClick) {
      onRowClick(id);
    }
  };

  return (
    <tr 
      className="hover:bg-secondary/20 cursor-pointer even:bg-gray-50"
      onClick={(e) => handleRowClick(e, record.id)}
    >
      {columns.map((column) => (
        <TableCell key={column.key}>
          {renderCellContent(record, column)}
        </TableCell>
      ))}
      <TableCell className="whitespace-nowrap">
        <div className="flex gap-2" data-no-row-click>
          {currentUser && (
            <>
              <EditButton
                id={record.id}
                userId={record.userId}
                currentUserId={currentUser.id}
                documentType={record.documentType}
              />
              <DeleteButton
                id={record.id}
                userId={record.userId}
                currentUserId={currentUser.id}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </>
          )}
        </div>
      </TableCell>
    </tr>
  );
};

export default TableRow;