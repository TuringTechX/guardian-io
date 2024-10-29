// src/components/Collaboration/DocumentSharing.tsx

import React, { useState } from 'react';
import { FaUpload, FaDownload, FaFileAlt, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Document {
  id: string;
  name: string;
  url: string;
  uploadedAt: Date;
}

const DocumentSharing: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const newDocument: Document = {
      id: Date.now().toString(),
      name: selectedFile.name,
      url: URL.createObjectURL(selectedFile),
      uploadedAt: new Date(),
    };

    setDocuments([...documents, newDocument]);
    setSelectedFile(null);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Document Sharing</h2>

      {/* Upload Section */}
      <div className="mb-4 flex items-center space-x-2">
        <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
        <label htmlFor="fileUpload" className="cursor-pointer p-2 bg-blue-500 text-white rounded">
          <FaUpload className="inline-block mr-2" /> Upload Document
        </label>
        {selectedFile && (
          <button onClick={handleUpload} className="p-2 bg-green-500 text-white rounded">
            <FaFileAlt className="inline-block mr-2" /> Add {selectedFile.name}
          </button>
        )}
      </div>

      {/* Document List */}
      <ul className="divide-y divide-gray-300 dark:divide-gray-600">
        {documents.map((doc) => (
          <motion.li
            key={doc.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            className="p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white">{doc.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Uploaded on {doc.uploadedAt.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-3">
              <a href={doc.url} download className="text-blue-600 dark:text-blue-400">
                <FaDownload />
              </a>
              <button onClick={() => handleDelete(doc.id)} className="text-red-600 dark:text-red-400">
                <FaTrash />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* No Documents Message */}
      {documents.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No documents shared yet.</p>
      )}
    </div>
  );
};

export default DocumentSharing;
