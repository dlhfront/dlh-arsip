import formatDate from "../lib/formatDate";

export const DOCUMENT_TYPES = {
  BERITA_ACARA: {
    title: "ARSIP - BERITA ACARA",
    createLink: "/dashboard/beritaacara/create",
    columns: [
      { key: "serialNumber", title: "No. Surat" },
      { key: "origin", title: "Pengolah" },
      { key: "summary", title: "Ringkasan" },
      { key: "formatNumber", title: "Lampiran" },
    ],
  },
  SURAT_KELUAR: {
    title: "ARSIP - SURAT KELUAR",
    createLink: "/dashboard/suratkeluar/create",
    columns: [
      { key: "serialNumber", title: "No. Surat" },
      { key: "index", title: "Indek" },
      { key: "origin", title: "Asal" },
      { 
        key: "classification", 
        title: "Klasifikasi",
        render: (record) => record.classification?.title || ""
      },
      { key: "summary", title: "Ringkasan" },
      { 
        key: "date", 
        title: "Tanggal",
        render: (record) => formatDate(record.date)
      },
      { key: "formatNumber", title: "Lampiran" },
    ],
  },
  SURAT_TUGAS: {
    title: "ARSIP - SURAT TUGAS",
    createLink: "/dashboard/surattugas/create",
    columns: [
      { key: "serialNumber", title: "No. Surat" },
      { key: "origin", title: "Pengolah" },
      { 
        key: "classification", 
        title: "Klasifikasi",
        render: (record) => record.classification?.title || record.classification || ""
      },
      { key: "summary", title: "Ringkasan" },
      { key: "formatNumber", title: "Lampiran" },
    ],
  },
  SURAT_KETERANGAN: {
    title: "ARSIP - SURAT KETERANGAN",
    createLink: "/dashboard/suratketerangan/create",
    columns: [
      { key: "serialNumber", title: "No. Surat" },
      { key: "origin", title: "Pengolah" },
      { key: "summary", title: "Ringkasan" },
      { 
        key: "classification", 
        title: "Klasifikasi",
        render: (record) => record.classification?.title || record.classification || ""
      },
      { key: "formatNumber", title: "Lampiran" },
    ],
  },
  SURAT_MASUK: {
    title: "ARSIP - SURAT MASUK",
    createLink: "/dashboard/suratmasuk/create",
    columns: [
      { key: "serialNumber", title: "No. Surat" },
      { key: "index", title: "Index" },
      { key: "origin", title: "Pengolah" },
      { 
        key: "classification", 
        title: "Klasifikasi",
        render: (record) => record.classification?.title || ""
      },
      { key: "summary", title: "Ringkasan" },
      { 
        key: "date", 
        title: "Tanggal",
        render: (record) => formatDate(record.date)
      },
      { key: "formatNumber", title: "Lampiran" },
    ],
  },
};