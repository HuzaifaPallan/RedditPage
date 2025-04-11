import React, { useState } from 'react';
import { FaUpload, FaSpinner, FaFileAlt } from 'react-icons/fa';
import styles from '../../styles/DocumentUpload.module.css';

const DocumentUpload = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(selectedFile);
      setError('');
      await handleAnalysis(selectedFile);
    } else {
      setError('Please upload a PDF or Word document');
      setFile(null);
    }
  };

  const handleAnalysis = async (selectedFile) => {
    setIsAnalyzing(true);
    try {
      // Here you would implement the actual file upload and AI analysis
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis results
      const analysisResults = {
        tags: ['gameplay', 'mechanics', 'level-design'],
        relevantPosts: [/* ... */]
      };
      
      onAnalysisComplete(analysisResults);
      setFile(null);
      setIsAnalyzing(false);
    } catch (err) {
      setError('Error analyzing document. Please try again.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadHeader}>
        <FaFileAlt className={styles.uploadIcon} />
        <h4 className={styles.uploadTitle}>Game Design Document Analysis</h4>
      </div>
      <p className={styles.description}>
        Upload your GDD to find relevant discussions and get automatic tag suggestions
      </p>
      
      <div className={styles.uploadBox}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className={styles.fileInput}
          disabled={isAnalyzing}
        />
        <div className={styles.uploadLabel}>
          <FaUpload />
          {file ? file.name : 'Drop your document here or click to browse'}
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      
      {isAnalyzing && (
        <div className={styles.analyzing}>
          <FaSpinner className={styles.spinner} />
          Analyzing document...
        </div>
      )}
    </div>
  );
};

export default DocumentUpload; 