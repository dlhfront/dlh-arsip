// app/dashboard/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EditButton from "../../components/molecules/EditButton";
import DeleteButton from "../../components/molecules/DeleteButton";
import { DOCUMENT_TYPES } from "../../config/documentTypes";
import ProtectedRoute from "../../components/ProtectedRoute";

const RecordDetailPage = ({ params }) => {
  const router = useRouter();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch record data
        const recordRes = await fetch(`/api/records/${params.id}`);
        if (!recordRes.ok) throw new Error("Failed to fetch record");
        const recordData = await recordRes.json();

        // Fetch current user
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        setRecord(recordData);
        setCurrentUser(userData);
      } catch (error) {
        toast.error(error.message);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleDeleteSuccess = () => {
    toast.success("Record deleted successfully");
    router.push(
      `/dashboard/${record.documentType.toLowerCase().replace("_", "")}`
    );
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!record) return <div className="p-4">Record not found</div>;

  const documentTypeConfig = DOCUMENT_TYPES[record.documentType] || {};
  const isOwner = currentUser?.id === record.userId;

  return (
    <ProtectedRoute>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-dark">
            {documentTypeConfig.title} - Detail
          </h1>
          <div className="flex gap-2">
            {isOwner && (
              <>
                <EditButton
                  id={record.id}
                  userId={record.userId}
                  currentUserId={currentUser.id}
                  documentType={record.documentType}
                />
                <DeleteButton
                  id={record.id}
                  userId={record.userId}
                  currentUserId={currentUser.id}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Fields */}
            <div className="space-y-4">
              <DetailField
                label="Tipe Dokumen"
                value={documentTypeConfig.title}
              />
              <DetailField label="Nomor Surat" value={record.serialNumber} />
              <DetailField label="Penomoran" value={record.formatNumber} />
              <DetailField label="Pengolah" value={record.origin} />
              <DetailField
                label="Tanggal"
                value={new Date(record.date).toLocaleDateString()}
              />
            </div>

            {/* Document Type Specific Fields */}
            <div className="space-y-4">
              <DetailField label="Isi Ringkasan" value={record.summary} />
              {record.index && (
                <DetailField label="Indeks" value={record.index} />
              )}
              <DetailField
                label="Klasifikasi"
                value={`${record.classificationCode} - ${record.classification?.title}`}
              />
              {record.attachment && (
                <DetailField
                  label="Attachment"
                  value={
                    <a
                      href={record.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Attachment
                    </a>
                  }
                />
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-pale">
            <p>Created by: {record.user?.username}</p>
            <p>Created at: {new Date(record.createdAt).toLocaleString()}</p>
            {record.updatedAt && (
              <p>Last updated: {new Date(record.updatedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

// Reusable detail field component
const DetailField = ({ label, value }) => (
  <div>
    <h3 className="font-medium text-dark">{label}</h3>
    <p className="mt-1 text-gray-700">{value || "-"}</p>
  </div>
);

export default RecordDetailPage;
