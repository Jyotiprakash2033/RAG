import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { uploadDocuments } from "../services/api";

function UploadBox() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter(file => file.name.endsWith('.pdf'));
    if (files.length < event.target.files.length) {
      toast.error("Only PDF files are supported!");
    }
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter(file => file.name.endsWith('.pdf'));
      if (files.length < e.dataTransfer.files.length) {
        toast.error("Only PDF files are supported!");
      }
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one PDF.");
      return;
    }

    try {
      setLoading(true);
      const response = await uploadDocuments(selectedFiles);
      toast.success(response.message || "Documents processed successfully!");
      setUploadedDocs(prev => {
        const fileNames = selectedFiles.map(f => f.name);
        return Array.from(new Set([...prev, ...fileNames]));
      });
      setSelectedFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 shadow-2xl flex flex-col h-full">
      <h2 className="mb-4 text-xl font-bold text-slate-100 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
        Document Knowledge Base
      </h2>

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileSelect}
        className={`flex-1 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/70"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 mb-4 shadow-lg">
          <svg className={`w-8 h-8 ${isDragActive ? "text-indigo-400 animate-bounce" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h10a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
          </svg>
        </div>

        <p className="text-sm font-medium text-slate-200 text-center">
          Drag & drop your files here or <span className="text-indigo-400 hover:underline">Browse</span>
        </p>
        <p className="text-xs text-slate-500 mt-1 text-center">Supports PDF files only</p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-5 flex-grow-0 max-h-[160px] overflow-y-auto pr-1">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Selected Files ({selectedFiles.length})
          </h3>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-lg border border-slate-800/80 p-2.5 bg-slate-950/60 transition-all hover:bg-slate-950"
              >
                <div className="flex items-center gap-2 overflow-hidden mr-2">
                  <span className="text-red-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium text-slate-300 truncate">{file.name}</p>
                    <p className="text-[10px] text-slate-500">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  className="p-1 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || selectedFiles.length === 0}
        className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800/80 disabled:text-slate-500 disabled:cursor-not-allowed px-4 py-3 text-sm font-semibold text-white transition-all shadow-lg hover:shadow-indigo-600/20 duration-200"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </>
        ) : (
          "Upload & Process"
        )}
      </button>

      {uploadedDocs.length > 0 && (
        <div className="mt-6 border-t border-slate-800/60 pt-4 flex-1 overflow-y-auto max-h-[180px]">
          <h3 className="text-xs font-semibold text-indigo-400/80 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.75 3.75 0 0121 12z" />
            </svg>
            Active Documents ({uploadedDocs.length})
          </h3>
          <ul className="space-y-1.5">
            {uploadedDocs.map((name, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-xs text-slate-300 py-1 px-2 rounded-lg bg-slate-950/20 border border-slate-900/40 truncate"
              >
                <span className="text-emerald-400 flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="truncate font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadBox;