import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CommunityLayout from '../../layouts/CommunityLayout';

// Community Pages
import CommunityHome from './CommunityHome';
import ChannelChat from './ChannelChat';
import MAdverts from './MAdverts';
import Announcements from './Announcements';
import Members from './Members';
import Events from './Events';
import Polls from './Polls';

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
        <Route path="announcements" element={<Announcements />} />
        <Route path="members" element={<Members />} />
        <Route path="events" element={<Events />} />
        <Route path="polls" element={<Polls />} />
        
        {/* Catch-all redirect to general */}
        <Route path="*" element={<Navigate to="/community/channel/general" replace />} />
      </Route>
    </Routes>
  );
};

export default CommunityRoutes;