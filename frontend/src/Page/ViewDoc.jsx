import { useState, useEffect } from "react";
import { deleteDocument, viewDocuments } from "../api/view";

function ViewDoc() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingFile, setDeletingFile] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await viewDocuments();
        setFiles(data.files);
      } catch (err) {
        setError("Failed to fetch documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleDelete = async (fileName) => {
    setDeletingFile(fileName);
    try {
      await deleteDocument(fileName);
      setFiles(files.filter((f) => f !== fileName));
    } catch (err) {
      setError("Failed to delete document.");
    } finally {
      setDeletingFile(null);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading documents...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Documents</h2>
      <p className="text-sm text-gray-500 mb-6">All indexed documents</p>

      {files.length === 0 ? (
        <p className="text-sm text-gray-400">No documents found.</p>
      ) : (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600">
              <div className="flex items-center gap-2 truncate">
                <span>📄</span>
                <span className="truncate">{file}</span>
              </div>
              <button
                onClick={() => handleDelete(file)}
                disabled={deletingFile === file}
                className="text-red-500 hover:text-red-700 disabled:text-red-300 text-xs font-medium shrink-0"
              >
                {deletingFile === file ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewDoc;