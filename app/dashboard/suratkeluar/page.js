"use client";

import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import RecordsPageTemplate from "../../components/templates/RecordsPageTemplate";
import { DOCUMENT_TYPES } from "../../config/documentTypes";
import ProtectedRoute from "../../components/ProtectedRoute";

const SuratKeluarPage = () => {
  const { currentUser, loading } = useCurrentUser();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch("/api/records/type/SURAT_KELUAR");
      const data = await response.json();
      setRecords(data);
    };

    fetchRecords();
  }, []);

  return (
    <ProtectedRoute>
      <RecordsPageTemplate
        {...DOCUMENT_TYPES.SURAT_KELUAR}
        records={records}
        currentUser={currentUser}
        loading={loading}
        documentType="SURAT_KELUAR"
      />
    </ProtectedRoute>
  );
};

export default SuratKeluarPage;
