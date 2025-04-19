"use client";

import FormPageTemplate from "../../../components/templates/FormPageTemplate";
import { DOCUMENT_TYPES } from "../../../config/documentTypes";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function CreateBeritaAcara() {
  return (
    <ProtectedRoute>
      <FormPageTemplate
        title={DOCUMENT_TYPES.BERITA_ACARA.title}
        documentType="BERITA_ACARA"
      />
    </ProtectedRoute>
  );
}
