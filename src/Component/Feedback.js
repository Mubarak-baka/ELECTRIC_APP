import React, { useState } from 'react';

const Feedback = () => {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const handleLike = () => {
        setLike(!like);
        if (dislike) setDislike(false); // Ensure like and dislike are not both selected
    };

    const handleDislike = () => {
        setDislike(!dislike);
        if (like) setLike(false); // Ensure like and dislike are not both selected
    };

    

    return (
        <div className="like-dislike-container">
            
          
                <div className="icons-box">
                    <div className="icons" onClick={handleLike}>
                        <input type="checkbox" id="like-checkbox" className="input-box" checked={like} readOnly />
                        <div className="btn-label">
                            <svg id="icon-like-regular" className="svgs" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <svg id="icon-like-solid" className="svgs" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span className="like-text-content">Like</span>
                        </div>
                    </div>
                    <div className="icons" onClick={handleDislike}>
                        <input type="checkbox" id="dislike-checkbox" className="input-box" checked={dislike} readOnly />
                        <div className="btn-label">
                            <svg id="icon-dislike-regular" className="svgs" viewBox="0 0 24 24">
                                <path d="M12 2.65l1.45 1.32C18.6 8.64 22 11.72 22 15.5c0 3.08-2.42 5.5-5.5 5.5-1.74 0-3.41-.81-4.5-2.09C10.91 19.19 9.24 20 7.5 20 4.42 20 2 17.58 2 14.5c0-3.78 3.4-6.86 8.55-11.54L12 2.65z" />
                            </svg>
                            <svg id="icon-dislike-solid" className="svgs" viewBox="0 0 24 24">
                                <path d="M12 2.65l1.45 1.32C18.6 8.64 22 11.72 22 15.5c0 3.08-2.42 5.5-5.5 5.5-1.74 0-3.41-.81-4.5-2.09C 10.91 19.19 9.24 20 7.5 20 4.42 20 2 17.58 2 14.5c0-3.78 3.4-6.86 8.55-11.54L12 2.65z" />
                            </svg>
                            <span className="dislike-text-content">Dislike</span>
                        </div>
                    </div>
                </div>
                
            
        </div>
    );
};

export default Feedback;