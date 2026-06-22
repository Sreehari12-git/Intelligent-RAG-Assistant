import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadDocuments } from "../api/upload";
import { logout } from "../api/auth";

function AdminPage() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setMessage(null);
    setError(null);
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
      setMessage(`✅ ${data.message} — ${data.chunks} chunks indexed`);
      setFiles([]);
    } catch (err) {
      setError("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/chat");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <p className="font-semibold text-gray-800 text-sm">Admin Panel</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Upload Documents</h2>
          <p className="text-sm text-gray-500 mb-6">Upload PDF files to index them for the chatbot</p>

          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:bg-blue-50 transition">
            <svg className="w-8 h-8 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="text-sm text-blue-500 font-medium">Click to select files</p>
            <p className="text-xs text-gray-400 mt-1">PDF files only (max 10)</p>
            <input
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">{files.length} file(s) selected:</p>
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600">
                  <span>📄</span>
                  <span className="truncate">{file.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Success / Error */}
          {message && (
            <p className="mt-4 text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2.5 rounded-xl transition"
          >
            {uploading ? "Uploading..." : "Upload & Index"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default AdminPage;