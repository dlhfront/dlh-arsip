// components/organisms/PageHeader.jsx
import Link from "next/link";

const PageHeader = ({ 
  title, 
  backLink, 
  showCreateButton = false,
  createLink = "#"
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-col gap-4">
        {backLink && (
          <Link href={backLink} className="text-primary hover:text-primary/80">
            ← Back
          </Link>
        )}
        <h1 className="text-2xl font-bold text-dark">{title}</h1>
      </div>
      
      {showCreateButton && (
        <Link href={createLink}>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
            Buat Arsip Baru
          </button>
        </Link>
      )}
    </div>
  );
};

export default PageHeader;