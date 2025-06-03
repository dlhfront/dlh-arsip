// app/components/templates/RecordsPageTemplate.jsx
'use client';
import { useRouter } from 'next/navigation';
import PageHeader from '../organism/PageHeader';
import RecordsTable from '../organism/RecordsTable';

const RecordsPageTemplate = ({
  title,
  createLink,
  currentUser,
  columns,
  documentType,
  loading
}) => {
  const router = useRouter();

  const handleRowClick = (recordId) => {
    router.push(`/dashboard/${recordId}`);
  };

  if (loading) return <div className="p-4">Loading user data...</div>;

  return (
    <div className="p-4">
      <PageHeader
        title={title}
        showCreateButton={true}
        createLink={createLink}
      />
      
      <RecordsTable
        documentType={documentType}
        currentUser={currentUser}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default RecordsPageTemplate;