import Link from 'next/link';
import { FiFileText } from 'react-icons/fi';

const RecentActivity = ({ records }) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Aktivitas Terbaru</h3>
      <div className="space-y-3">
        {records.map((record) => (
          <Link 
            key={record.id}
            href={`/dashboard/${record.documentType.toLowerCase()}/${record.id}`}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
          >
            <FiFileText className="text-primary" />
            <div>
              <p className="text-sm font-medium">{record.summary}</p>
              <p className="text-xs text-gray-500">
                {new Date(record.createdAt).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
        {records.length === 0 && (
          <p className="text-sm text-gray-500">Tidak ada aktivitas terbaru</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;