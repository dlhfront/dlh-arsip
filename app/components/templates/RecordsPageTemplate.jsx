'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '../organism/PageHeader';
import RecordsTable from '../organism/RecordsTable';
import SearchInput from '../molecules/SearchInput';

const RecordsPageTemplate = ({
  title,
  createLink,
  currentUser,
  columns,
  documentType,
  loading: userLoading
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('query') || '';
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  const handleRowClick = (recordId) => {
    router.push(`/dashboard/${recordId}`);
  };

  // Client-side pagination for search results
  const paginateRecords = (records) => {
    const startIndex = (pagination.page - 1) * pagination.limit;
    return records.slice(startIndex, startIndex + pagination.limit);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const url = query
          ? `/api/records/search?documentType=${documentType}&query=${encodeURIComponent(query)}`
          : `/api/records?type=${documentType}&page=${pagination.page}&limit=${pagination.limit}`;

        const res = await fetch(url);
        const data = await res.json();

        if (query) {
          // For search results (client-side pagination)
          setRecords(data);
          setPagination(prev => ({
            ...prev,
            total: data.length,
            totalPages: Math.ceil(data.length / prev.limit)
          }));
        } else {
          // For normal view (server-side pagination)
          setRecords(data.data || []);
          setPagination(prev => ({
            ...prev,
            total: data.pagination?.total || 0,
            totalPages: data.pagination?.totalPages || 1
          }));
        }
      } catch (error) {
        console.error('Failed to fetch records:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchRecords();
    }
  }, [documentType, query, pagination.page, userLoading]);

  if (userLoading) return <div className="p-4">Loading user data...</div>;

  return (
    <div className="p-4 space-y-4">
      <PageHeader
        title={title}
        showCreateButton={true}
        createLink={createLink}
      />
      <SearchInput documentType={documentType} />
      <RecordsTable
        documentType={documentType}
        currentUser={currentUser}
        columns={columns}
        records={query ? paginateRecords(records) : records}
        loading={loading}
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default RecordsPageTemplate;