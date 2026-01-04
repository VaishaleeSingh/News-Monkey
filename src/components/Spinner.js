import React from "react";

export default function Spinner() {
  return (
    <div className="text-center my-5 spinner-wrapper">
      <div className="spinner-container">
        <div className="spinner-ring" style={{
          boxSizing: 'border-box',
          display: 'block',
          position: 'absolute',
          width: '64px',
          height: '64px',
          margin: '8px',
          border: '6px solid',
          borderColor: '#667eea transparent transparent transparent',
          borderRadius: '50%',
          animation: 'spinner-rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
        }}></div>
        <div className="spinner-ring" style={{
          boxSizing: 'border-box',
          display: 'block',
          position: 'absolute',
          width: '64px',
          height: '64px',
          margin: '8px',
          border: '6px solid',
          borderColor: '#764ba2 transparent transparent transparent',
          borderRadius: '50%',
          animation: 'spinner-rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          animationDelay: '-0.45s'
        }}></div>
        <div className="spinner-ring" style={{
          boxSizing: 'border-box',
          display: 'block',
          position: 'absolute',
          width: '64px',
          height: '64px',
          margin: '8px',
          border: '6px solid',
          borderColor: '#f093fb transparent transparent transparent',
          borderRadius: '50%',
          animation: 'spinner-rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          animationDelay: '-0.3s'
        }}></div>
        <div className="spinner-ring" style={{
          boxSizing: 'border-box',
          display: 'block',
          position: 'absolute',
          width: '64px',
          height: '64px',
          margin: '8px',
          border: '6px solid',
          borderColor: '#667eea transparent transparent transparent',
          borderRadius: '50%',
          animation: 'spinner-rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          animationDelay: '-0.15s'
        }}></div>
      </div>
      <style>{`
        @keyframes spinner-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

