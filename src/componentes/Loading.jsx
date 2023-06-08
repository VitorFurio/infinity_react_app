import React from 'react';
import './Loading.css'

export default function Loading({message}) {
  return (
    <div className="loading">
      <h3>{message}</h3>
      <div className="spinner"></div>
    </div>
  );
};
