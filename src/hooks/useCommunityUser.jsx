// hooks/useCommunityUser.js
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useCommunityUser = () => {
  const { user, isAuthenticated } = useAuth();
  const [communityUser, setCommunityUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Transform auth user data into community format
      setCommunityUser({
        id: user.id,
        name: user.full_name,
        username: user.username || user.full_name?.toLowerCase().replace(/\s/g, ''),
        email: user.email,
        avatar: user.avatar || user.full_name?.charAt(0) || 'U',
        role: user.roles?.[0] || 'Member',
        badge: getBadgeByRole(user.roles?.[0]),
        kyc_status: user.kyc_status,
        rating: user.rating || 4.5,
        joined: user.created_at?.split('T')[0] || '2024',
        location: user.location || 'Nigeria',
        bio: user.bio || 'Community member passionate about connecting and sharing knowledge.',
        stats: {
          posts: user.stats?.posts || 0,
          deals: user.stats?.deals || 0,
          likes: user.stats?.likes || 0,
          comments: user.stats?.comments || 0
        }
      });
    } else {
      setCommunityUser(null);
    }
  }, [user, isAuthenticated]);

  const getBadgeByRole = (role) => {
    switch (role) {
      case 'SELLER': return 'Gold';
      case 'BUYER': return 'Silver';
      case 'FREELANCER': return 'Platinum';
      default: return 'Member';
    }
  };

  return { communityUser, isAuthenticated };
};