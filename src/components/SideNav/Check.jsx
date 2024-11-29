import React, { useState } from "react";
const imageData = [
  { id: 1, imageUrl: "image1.jpg", likes: 0, liked: false },
  { id: 2, imageUrl: "image2.jpg", likes: 0, liked: false },
  { id: 3, imageUrl: "image3.jpg", likes: 0, liked: false },
];

const Check = () => {
  const [data, setData] = useState(imageData);

  const handleLike = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1, liked: true } : item
      )
    );
  };

  const handleDislike = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.likes > 0
          ? { ...item, likes: item.likes - 1, liked: false }
          : item
      )
    );
  };

  return (
    <div className="gallery">
      {data.map((item) => (
        <div key={item.id} className="image-card">
          <img src={item.imageUrl} alt={`Image ${item.id}`} className="image" />
          <div className="like-container">
            {!item.liked ? (
              <button
                onClick={() => handleLike(item.id)}
                className="like-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="like-svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => handleDislike(item.id)}
                className="dislike-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="dislike-svg"
                >
                  <path d="M12 2.65l1.45 1.32C18.6 8.64 22 11.72 22 15.5 22 18.58 19.58 21 16.5 21c-1.74 0-3.41-.81-4.5-2.09C10.91 20.19 9.24 21 7.5 21 4.42 21 2 18.58 2 15.5c0-3.78 3.4-6.86 8.55-11.54L12 2.65z" />
                </svg>
              </button>
            )}
            <p>Likes: {item.likes}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Check;
