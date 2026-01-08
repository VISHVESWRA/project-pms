// src/Documents.js
import React, { useState, useEffect } from "react";

const API_URL = "https://project-pms-backend.onrender.com/api";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    documentType: "aadhar",
    holderName: "",
    documentNumber: "",
    expiryDate: "",
    notes: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [statistics, setStatistics] = useState(null);

  const documentTypes = [
    { value: "aadhar", label: "Aadhaar Card", icon: "🪪" },
    { value: "pan", label: "PAN Card", icon: "💳" },
    { value: "driving_license", label: "Driving License", icon: "🚗" },
    { value: "voter_id", label: "Voter ID", icon: "🗳️" },
    { value: "passport", label: "Passport", icon: "🛂" },
    { value: "other", label: "Other", icon: "📄" },
  ];

  useEffect(() => {
    fetchDocuments();
    fetchStatistics();
  }, [filterType, searchTerm]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/documents`;
      const params = new URLSearchParams();
      if (filterType !== "all") params.append("documentType", filterType);
      if (searchTerm) params.append("search", searchTerm);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const result = await response.json();
      setDocuments(result.data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`${API_URL}/documents/statistics`);
      const result = await response.json();
      setStatistics(result.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size too large. Maximum size is 10MB.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    if (!formData.holderName.trim()) {
      alert("Please enter holder name");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", selectedFile);
    uploadFormData.append("documentType", formData.documentType);
    uploadFormData.append("holderName", formData.holderName);
    uploadFormData.append("documentNumber", formData.documentNumber);
    uploadFormData.append("expiryDate", formData.expiryDate);
    uploadFormData.append("notes", formData.notes);

    setUploading(true);
    try {
      const response = await fetch(`${API_URL}/documents/upload`, {
        method: "POST",
        body: uploadFormData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Document uploaded successfully!");
        setFormData({
          documentType: "aadhar",
          holderName: "",
          documentNumber: "",
          expiryDate: "",
          notes: "",
        });
        setSelectedFile(null);
        setShowUploadForm(false);
        await fetchDocuments();
        await fetchStatistics();
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;

    try {
      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ Document deleted successfully");
        await fetchDocuments();
        await fetchStatistics();
      } else {
        alert("Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document");
    }
  };

  const handleDownload = async (doc) => {
    try {
      let downloadUrl = doc.cloudinaryUrl;

      if (doc.fileType === "application/pdf") {
        // Clean up any existing /raw/ or /image/ and ensure correct format
        downloadUrl = downloadUrl
          .replace("/raw/raw/", "/raw/")
          .replace("/image/raw/", "/raw/")
          .replace("/raw/upload/", "/raw/upload/fl_attachment/")
          .replace("/image/upload/", "/raw/upload/fl_attachment/");

        // If it doesn't have /raw/ at all, add it
        if (!downloadUrl.includes("/raw/")) {
          downloadUrl = downloadUrl.replace(
            "/upload/",
            "/raw/upload/fl_attachment/"
          );
        }

        // Remove duplicate fl_attachment if exists
        downloadUrl = downloadUrl.replace(
          "/fl_attachment/fl_attachment/",
          "/fl_attachment/"
        );
      } else {
        // For images, just add fl_attachment
        downloadUrl = doc.cloudinaryUrl.replace(
          "/upload/",
          "/upload/fl_attachment/"
        );
      }

      console.log("Download URL:", downloadUrl); // For debugging

      // Create a temporary link and click it
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = doc.originalName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download document");
    }
  };

  const getDocumentIcon = (type) => {
    const doc = documentTypes.find((d) => d.value === type);
    return doc ? doc.icon : "📄";
  };

  const getDocumentLabel = (type) => {
    const doc = documentTypes.find((d) => d.value === type);
    return doc ? doc.label : type;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 90;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-amber-50 px-6 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="border-2 border-gray-900 rounded-full px-5 py-1.5 text-lg font-bold">
            PMS
          </div>
          <div className="flex gap-4 items-center">
            <button className="text-lg text-gray-600 hover:text-gray-900">
              ☰
            </button>
            <button className="text-lg text-gray-600 hover:text-gray-900">
              ⚙️
            </button>
            <button className="text-lg text-gray-600 hover:text-gray-900">
              🔔
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              V
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-amber-50 px-6 py-3 flex gap-3 flex-wrap">
        {[
          "Dashboard",
          "Income",
          "Expenses",
          "Policies",
          "Loans",
          "Chits",
          "Misc",
          "Documents",
          "Setting",
        ].map((item) => (
          <button
            key={item}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              item === "Documents"
                ? "bg-gray-900 text-white"
                : "bg-transparent text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              ID Proofs & Documents
            </h1>
            <p className="text-sm text-gray-600">
              Securely store your important documents in the cloud
            </p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all transform hover:-translate-y-0.5"
          >
            {showUploadForm ? "✕ Close Form" : "+ Upload Document"}
          </button>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-2xl font-bold text-gray-900">
                {statistics.totalDocuments}
              </div>
              <div className="text-xs text-gray-600">Total Documents</div>
            </div>
            {statistics.typeStats.map((stat) => (
              <div
                key={stat._id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-2xl mb-1">{getDocumentIcon(stat._id)}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.count}
                </div>
                <div className="text-xs text-gray-600">
                  {getDocumentLabel(stat._id)}
                </div>
              </div>
            ))}
            {statistics.expiringDocs.length > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-2xl mb-1">⚠️</div>
                <div className="text-2xl font-bold text-gray-900">
                  {statistics.expiringDocs.length}
                </div>
                <div className="text-xs text-gray-600">Expiring Soon</div>
              </div>
            )}
          </div>
        )}

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-slideDown">
            <h3 className="text-xl font-semibold mb-4">Upload New Document</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Document Type *
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) =>
                      setFormData({ ...formData, documentType: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {documentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Holder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.holderName}
                    onChange={(e) =>
                      setFormData({ ...formData, holderName: e.target.value })
                    }
                    placeholder="Enter full name"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Document Number
                  </label>
                  <input
                    type="text"
                    value={formData.documentNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        documentNumber: e.target.value,
                      })
                    }
                    placeholder="e.g., ABCD1234E"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Add any additional notes..."
                  rows="2"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileSelect}
                  required
                  className="hidden"
                />
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-all"
                >
                  <span className="text-3xl">📁</span>
                  <span className="text-sm text-gray-700">
                    {selectedFile
                      ? selectedFile.name
                      : "Choose File (PDF or Image, Max 10MB)"}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {uploading ? "⏳ Uploading to Cloud..." : "☁️ Upload to Cloud"}
              </button>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Search by name or document number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              filterType === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            All Documents
          </button>
          {documentTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilterType(type.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filterType === type.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-500">Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No documents found
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload your first document to get started
            </p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
            >
              + Upload Document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 p-4 relative group ${
                  isExpired(doc.expiryDate)
                    ? "border-2 border-red-500"
                    : isExpiringSoon(doc.expiryDate)
                    ? "border-2 border-yellow-500"
                    : ""
                }`}
              >
                <button
                  onClick={() => handleDeleteDocument(doc._id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex items-center justify-center text-sm"
                >
                  ✕
                </button>

                <div
                  className="w-full h-36 bg-gray-100 rounded-lg mb-3 overflow-hidden cursor-pointer"
                  onClick={() => setPreviewDoc(doc)}
                >
                  {doc.fileType.startsWith("image/") ? (
                    <img
                      src={doc.cloudinaryUrl}
                      alt={doc.originalName}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-5xl mb-2">📕</div>
                      <div className="text-xs text-gray-600 font-medium">
                        PDF Document
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">
                      {getDocumentIcon(doc.documentType)}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getDocumentLabel(doc.documentType)}
                    </span>
                  </div>

                  <div className="text-xs text-gray-700 mb-1">
                    <strong className="text-gray-600">Name:</strong>{" "}
                    {doc.holderName}
                  </div>

                  {doc.documentNumber && (
                    <div className="text-xs text-gray-700 mb-1">
                      <strong className="text-gray-600">Number:</strong>{" "}
                      {doc.documentNumber}
                    </div>
                  )}

                  {doc.expiryDate && (
                    <div
                      className={`text-xs mb-1 ${
                        isExpired(doc.expiryDate)
                          ? "text-red-600 font-semibold"
                          : isExpiringSoon(doc.expiryDate)
                          ? "text-yellow-600 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      <strong>Expires:</strong> {formatDate(doc.expiryDate)}
                      {isExpired(doc.expiryDate) && (
                        <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          EXPIRED
                        </span>
                      )}
                      {isExpiringSoon(doc.expiryDate) &&
                        !isExpired(doc.expiryDate) && (
                          <span className="ml-1 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                            EXPIRING SOON
                          </span>
                        )}
                    </div>
                  )}

                  <div className="flex gap-3 text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                    <span>📅 {formatDate(doc.uploadDate)}</span>
                    {doc.fileSize && (
                      <span>📦 {formatFileSize(doc.fileSize)}</span>
                    )}
                  </div>

                  {doc.notes && (
                    <div className="mt-2 text-xs text-gray-600 bg-blue-50 p-2 rounded border-l-2 border-blue-500">
                      <strong>Notes:</strong> {doc.notes}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>👁️</span> View
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>⬇️</span> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden animate-slideUp flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewDoc(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center text-lg z-10 shadow-lg"
            >
              ✕
            </button>

            <div className="p-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-1">
                {getDocumentIcon(previewDoc.documentType)}{" "}
                {getDocumentLabel(previewDoc.documentType)}
              </h3>
              <p className="text-sm text-gray-600">{previewDoc.holderName}</p>
            </div>

            <div className="p-4">
              {previewDoc.fileType.startsWith("image/") ? (
                <img
                  src={previewDoc.cloudinaryUrl}
                  alt={previewDoc.originalName}
                  className="max-w-full max-h-[70vh] mx-auto rounded-lg"
                />
              ) : previewDoc.fileType === "application/pdf" ? (
                <>
                  {/* Try embedding PDF viewer */}
                  <iframe
                    src={(() => {
                      let url = previewDoc.cloudinaryUrl;
                      // Clean up URL
                      url = url
                        .replace("/raw/raw/", "/raw/")
                        .replace("/image/raw/", "/raw/")
                        .replace("/image/upload/", "/raw/upload/")
                        .replace("/upload/", "/raw/upload/");

                      // Remove any fl_attachment for preview
                      url = url.replace("/fl_attachment/", "/");

                      console.log("Preview URL:", url);
                      return url;
                    })()}
                    className="w-full h-[75vh] border-0 rounded-lg"
                    title={previewDoc.originalName}
                    onError={(e) => {
                      console.error("PDF load error:", e);
                      e.target.style.display = "none";
                      document.getElementById(
                        "pdf-error-message"
                      ).style.display = "block";
                    }}
                  />
                  <div
                    id="pdf-error-message"
                    className="text-center py-20"
                    style={{ display: "none" }}
                  >
                    <div className="text-6xl mb-4">📕</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Cannot preview PDF in browser
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Click download to view the document
                    </p>
                    <button
                      onClick={() => handleDownload(previewDoc)}
                      className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      ⬇️ Download PDF
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Preview not available
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    This file type cannot be previewed in browser
                  </p>
                  <button
                    onClick={() => handleDownload(previewDoc)}
                    className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    ⬇️ Download to View
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-center">
              <button
                onClick={() => handleDownload(previewDoc)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                ⬇️ Download
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;
