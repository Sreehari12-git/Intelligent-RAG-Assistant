import { useState } from "react";
import { uploadDocuments } from "../api/upload";

function UploadPage() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setMessage(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = [...e.dataTransfer.files].filter(f => f.type === "application/pdf");
    if (dropped.length) {
      setFiles(dropped);
      setMessage(null);
      setError(null);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }
    setUploading(true);
    setMessage(null);
    setError(null);
    try {
      const data = await uploadDocuments(files);
      setMessage(`${data.message} — ${data.chunks} chunks indexed`);
      setFiles([]);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#E8E6FF] mb-1">Upload Documents</h2>
        <p className="text-sm text-[#6B6A8A]">Upload PDF files to index them for the assistant</p>
      </div>

      <label
        className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-[#6C5CE7] bg-[#6C5CE7]/10"
            : "border-[#2A2550] bg-[#13111F] hover:border-[#6C5CE7]/50 hover:bg-[#6C5CE7]/5"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="w-12 h-12 rounded-xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A89FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-[#A89FE8]">
          {dragging ? "Drop files here" : "Click to select or drag & drop"}
        </p>
        <p className="text-xs text-[#4A4770] mt-1">PDF files only · max 10 files</p>
        <input
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6B6A8A]">
            {files.length} file{files.length > 1 ? "s" : ""} selected
          </p>
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#13111F] border border-[#2A2550]/60 px-4 py-2.5 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A89FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span className="text-sm text-[#D8D5F5] truncate flex-1">{file.name}</span>
              <span className="text-xs text-[#4A4770] shrink-0">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                onClick={() => removeFile(i)}
                className="text-[#4A4770] hover:text-red-400 transition-colors duration-150 shrink-0 ml-1"
                aria-label="Remove file"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {message && (
        <div className="mt-4 flex items-start gap-2.5 bg-emerald-950/30 border border-emerald-800/40 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p className="text-sm text-emerald-300">{message}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2.5 bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-[#6C5CE7] hover:bg-[#5A4DD4] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#6C5CE7]/20 hover:shadow-[#6C5CE7]/30 active:scale-[0.98]"
      >
        {uploading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Uploading…
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload & Index
          </>
        )}
      </button>

    </div>
  );
}

export default UploadPage;