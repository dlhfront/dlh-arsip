'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableHeaderCell from '../atoms/Table/TableHeaderCell';
import TableRow from '../molecules/TableRow';
import PaginationControls from '../molecules/PaginationControls';

const RecordsTable = ({ 
  documentType,
  currentUser,
  columns,
  onRowClick // Keep the row click handler
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/records?type=${documentType}&page=${pagination.page}&limit=${pagination.limit}`
      );
      const response = await res.json();
      
      if (!res.ok) throw new Error(response.error || 'Failed to fetch data');
      
      setData(response.data || []);
      setPagination(prev => ({
        ...prev,
        total: response.pagination?.total || 0,
        totalPages: response.pagination?.totalPages || 1
      }));
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page, documentType]);

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (loading) return <div className="p-4">Loading...</div>;

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
            {data.map((record) => (
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
      
      <PaginationControls
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RecordsTable;