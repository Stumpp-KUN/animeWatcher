import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import YourComponent from './head.jsx';
import './styles.css';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<YourComponent />);
