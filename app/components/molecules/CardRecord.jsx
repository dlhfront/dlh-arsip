// components/molecules/CardRecord.jsx
import Link from 'next/link';

const CardRecord = ({ documentType, count, latestDate }) => {
  const typeNames = {
    SURAT_KELUAR: 'Surat Keluar',
    BERITA_ACARA: 'Berita Acara',
    SURAT_TUGAS: 'Surat Tugas',
    SURAT_KETERANGAN: 'Surat Keterangan',
    SURAT_MASUK: 'Surat Masuk'
  };

  // Handle undefined values
  const displayCount = count ?? 0;
  const displayDate = latestDate ? new Date(latestDate).toLocaleDateString() : 'N/A';

  return (
    <Link 
      href={`/dashboard/${documentType.toLowerCase()}`}
      className="flex flex-col w-full border-2 border-primary text-center shadow-xl rounded-xl text-dark hover:shadow-2xl transition-shadow"
    >
      <div className='border-b-2 border-secondary p-3 bg-primary/10'>
        <h3 className="font-medium">{typeNames[documentType] || documentType}</h3>
      </div>
      <div className='p-4'>
        <p className='font-bold text-3xl mb-1'>{displayCount}</p>
        <p className='text-xs text-gray-500'>
          Updated: {displayDate}
        </p>
      </div>
    </Link>
  );
};

export default CardRecord;