import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CommunityLayout from '../../layouts/CommunityLayout';

// Community Pages
import ChannelChat from './ChannelChat';
import Announcements from './Announcements';
import MAdverts from './MAdverts';
import All_M_Adverts from './All_M_Adverts';

const CommunityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CommunityLayout />}>
        {/* Redirect root to general channel */}
        <Route index element={<Navigate to="/community/channel/general" replace />} />
        
        {/* Channel routes */}
        <Route path="channel/:channelId" element={<ChannelChat />} />
        
        {/* Other community pages */}
        <Route path="m-adverts" element={<MAdverts />} />
        <Route path="all-m-adverts" element={<All_M_Adverts />} />
        <Route path="announcements" element={<Announcements />} />
        
        {/* Catch-all redirect to general */}
        <Route path="*" element={<Navigate to="/community/channel/general" replace />} />
      </Route>
    </Routes>
  );
};

export default CommunityRoutes;