import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

function PDFViewer({ pdfFile }) {
    const [numPages, setNumPages] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    }, []);

    const documentOnLoad = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleError = (error) => {
        setError(error.message);
    };

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <div style={{ 
                    width: "400px", 
                    maxHeight: "80vh", 
                    overflowY: "auto", 
                    border: "1px solid #ccc",
                    display: "flex", 
                    justifyContent: "center" 
                }}>
                    <Document file={pdfFile} onLoadSuccess={documentOnLoad} onLoadError={handleError}>
                        {[...Array(numPages)].map((_, i) => (
                            <div key={i} style={{ marginBottom: "10px" }}>
                                <Page
                                    pageNumber={i + 1}
                                    renderAnnotationLayer={false}
                                    renderMode="canvas"
                                    renderTextLayer={false}
                                    width={400} 
                                />
                                <hr />
                            </div>
                        ))}
                    </Document>
                </div>
            )}
            <p>Pages {numPages}</p>
        </div>
    );
}

export default PDFViewer;
