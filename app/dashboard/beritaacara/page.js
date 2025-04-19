"use client";

import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import RecordsPageTemplate from "../../components/templates/RecordsPageTemplate";
import { DOCUMENT_TYPES } from "../../config/documentTypes";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const BeritaAcaraPage = () => {
  const { currentUser, loading } = useCurrentUser();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch("/api/records/type/BERITA_ACARA");
      const data = await response.json();
      setRecords(data);
    };

    fetchRecords();
  }, []);

  return (
    // <ProtectedRoute>
      <RecordsPageTemplate
        {...DOCUMENT_TYPES.BERITA_ACARA}
        records={records}
        currentUser={currentUser}
        loading={loading}
        documentType="BERITA_ACARA"
        createLink={"/dashboard/beritaacara/create"}
      />
    // </ProtectedRoute>
  );
};

export default BeritaAcaraPage;
