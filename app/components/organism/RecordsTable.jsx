'use client';
import { toast } from 'react-toastify';
import TableHeaderCell from '../atoms/Table/TableHeaderCell';
import TableRow from '../molecules/TableRow';
import PaginationControls from '../molecules/PaginationControls';

const RecordsTable = ({ 
  documentType,
  currentUser,
  columns,
  records,
  loading,
  pagination,
  onPageChange,
  onRowClick
}) => {
  if (loading) return <div className="p-4">Loading...</div>;
  if (!loading && records.length === 0) return <div className="p-4">No records found</div>;

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {columns.map((column) => (
                <TableHeaderCell key={column.key}>
                  {column.title}
                </TableHeaderCell>
              ))}
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <TableRow
                key={record.id}
                record={record}
                currentUser={currentUser}
                columns={columns}
                onRowClick={onRowClick}
                docType={documentType.toLowerCase().replace("_", "")}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination.totalPages > 1 && (
        <PaginationControls
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          loading={loading}
        />
      )}
    </div>
  );
};

export default RecordsTable;