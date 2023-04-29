import React from 'react';
import './Loading.css'

export default function Loading() {
  return (
    <div className="loading">
      <h3>Buscando dados na Blockchain...</h3>
      <div className="spinner"></div>
    </div>
  );
};
