import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore/lite";

const Demo = () => {
    const [file, setFile] = useState(null); // To store the selected file
    const [status, setStatus] = useState(''); // To display upload status
  
    // Handle file selection
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Please select a valid PDF file.');
      }
    };
  
    // Handle submit button click
    const handleSubmit = async () => {
      if (!file) {
        alert('Please select a file first.');
        return;
      }
  
      try {
        setStatus('Uploading...');
  
        // Upload PDF to Firebase Storage
        const storageRef = ref(storage, `pdfs/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
  
        // Save PDF metadata to Firestore
        const pdfDoc = {
          name: file.name,
          url: downloadURL,
          uploadedAt: new Date().toISOString(),
        };
  
        await setDoc(doc(db, 'pdfs', file.name), pdfDoc);
  
        setStatus('Upload Successful!');
        console.log('PDF saved to Firestore:', pdfDoc);
      } catch (error) {
        console.error('Error uploading file:', error);
        setStatus('Upload Failed. Please try again.');
      }
    };
  
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <h2>Upload PDF</h2>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <br />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
        <p>{status}</p>
      </div>
    );
};

export default Demo;
