import React, { useState } from 'react';
import PDFViewer from './components/PDFViewer';
import  "./App.css"
const App = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPdfFile(event.target.result); // set the file's ArrayBuffer to state
      };
      reader.readAsArrayBuffer(file); // read the file as ArrayBuffer
    }
  };

  return (
    <div>
      <h1>Simple PDF Viewer</h1>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      {pdfFile ? (
        <PDFViewer pdfFile={pdfFile} />
      ) : (
        <p>No PDF file specified.</p>
      )}
    </div>
  );
};

export default App;
