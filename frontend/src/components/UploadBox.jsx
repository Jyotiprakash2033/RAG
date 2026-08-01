import { useState } from "react";
import toast from "react-hot-toast";
import { uploadDocuments } from "../services/api";

function UploadBox() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one PDF.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadDocuments(selectedFiles);

      toast.success(response.message);

      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">
        Upload Documents
      </h2>

      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={handleFileChange}
      />
      {selectedFiles.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold mb-2">Selected Files</h3>

    <ul className="space-y-2">
      {selectedFiles.map((file, index) => (
        <li
          key={index}
          className="rounded border p-2 bg-gray-50"
        >
          📄 {file.name}
        </li>
      ))}
    </ul>
  </div>
)}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="ml-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default UploadBox;