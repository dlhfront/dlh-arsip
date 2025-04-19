"use client";

import FormPageTemplate from "../../../components/templates/FormPageTemplate";
import { DOCUMENT_TYPES } from "../../../config/documentTypes";
import ProtectedRoute from "../../../components/ProtectedRoute";
export default function CreateSuratTugas() {
  return (
    <ProtectedRoute>
      <FormPageTemplate
        title={DOCUMENT_TYPES.SURAT_TUGAS.title}
        documentType="SURAT_TUGAS"
      />
    </ProtectedRoute>
  );
}
