"use client";

import FormPageTemplate from "../../../../components/templates/FormPageTemplate";
import { DOCUMENT_TYPES } from "../../../../config/documentTypes";
import ProtectedRoute from "../../../../components/ProtectedRoute";
export default function EditSuratKeterangan({ params }) {
  return (
    <ProtectedRoute>
      <FormPageTemplate
        title={DOCUMENT_TYPES.SURAT_KETERANGAN.title}
        documentType="SURAT_KETERANGAN"
        recordId={params.id}
        headerType={"back"}
      />
    </ProtectedRoute>
  );
}
