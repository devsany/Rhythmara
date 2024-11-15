import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useRef } from "react";

function UploadSong() {
  const [songUrl, setSongUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const handleUpload = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `songs/${file.name}`);

    try {
      setUploading(true); // Show loading indicator

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const url = await getDownloadURL(storageRef);
      setSongUrl(url); // Save URL to state or use as needed

      console.log("File uploaded successfully, download URL:", url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false); // Hide loading indicator
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file dialog
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file); // Upload file on selection
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Song"}
      </button>
      <input
        type="file"
        accept=".mp3"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {songUrl && (
        <div>
          <p>Song Uploaded! Listen below:</p>
          <audio controls src={songUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default UploadSong;
