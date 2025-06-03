"use client";

import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import RecordsPageTemplate from "../../components/templates/RecordsPageTemplate";
import { DOCUMENT_TYPES } from "../../config/documentTypes";
import ProtectedRoute from "../../components/ProtectedRoute";

const SuratKeluarPage = () => {
  const { currentUser, loading : userLoading } = useCurrentUser();
  const [records, setRecords] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("/api/records/type/SURAT_KELUAR");
        if (!response.ok) throw new Error('Failed to fetch records');
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setDataLoading(false);
      }
    };

    if (currentUser) {
      fetchRecords();
    }
  }, [currentUser]);

  if (userLoading || dataLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <RecordsPageTemplate
        {...DOCUMENT_TYPES.SURAT_KELUAR}
        records={records}
        currentUser={currentUser}
        loading={userLoading || dataLoading}
        documentType="SURAT_KELUAR"
      />
    </ProtectedRoute>
  );
};

export default SuratKeluarPage;
