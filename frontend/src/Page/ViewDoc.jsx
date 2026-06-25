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
      setFiles((prev) => prev.filter((f) => f !== fileName));
    } catch (err) {
      setError("Failed to delete document.");
      setDeletingFile(null);
    } finally {
      setDeletingFile(null);
    }
  };

  if (loading) return (
    <div className="flex items-center gap-3 text-sm text-[#6B6A8A]">
      <svg className="animate-spin w-4 h-4 text-[#6C5CE7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      Loading documents…
    </div>
  );

  if (error) return (
    <div className="flex items-start gap-2.5 bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-3 max-w-2xl">
      <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-sm text-red-300">{error}</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#E8E6FF] mb-1">Documents</h2>
        <p className="text-sm text-[#6B6A8A]">
          {files.length > 0 ? `${files.length} indexed document${files.length > 1 ? "s" : ""}` : "All indexed documents"}
        </p>
      </div>

      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-[#13111F] border border-[#2A2550]/60 rounded-2xl py-16 gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A89FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[#6B6A8A]">No documents found</p>
          <p className="text-xs text-[#4A4770]">Upload a PDF to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-[#13111F] border border-[#2A2550]/60 px-4 py-3 rounded-xl hover:border-[#3D3860] transition-colors duration-150"
            >
              <div className="w-8 h-8 rounded-lg bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A89FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>

              <span className="text-sm text-[#D8D5F5] truncate flex-1">{file}</span>

              <button
                onClick={() => handleDelete(file)}
                disabled={deletingFile === file}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#6B6A8A] hover:text-red-400 disabled:text-[#3D3860] disabled:cursor-not-allowed transition-colors duration-150 shrink-0 px-2 py-1 rounded-lg hover:bg-red-950/30"
              >
                {deletingFile === file ? (
                  <>
                    <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Deleting…
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    Delete
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewDoc;