import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicPortfolio from './components/PublicPortfolio';
import AdminPortal from './components/admin/AdminPortal';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicPortfolio />} />
        <Route path="/admin/*" element={<AdminPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;