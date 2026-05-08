import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Bell, 
  Users, 
  ShoppingBag, 
  Briefcase,
  Calendar,
  BarChart3,
  HelpCircle,
  Plus,
  Lock,
  ChevronDown,
  ChevronRight,
  X,
  Megaphone,
  MessageSquare,
  UserPlus,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Volume2,
  Settings,
  Map,
  Star,
  Trophy,
  MoreVertical,
  BellOff,
  Link as LinkIcon,
  LogOut
} from 'lucide-react';
// import Logo from "../../assets/mosalak-logo.png";
import CreateChannelModal from './CreateChannelModal';

const CommunitySidebar = ({ isOpen, onClose }) => {
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState({
    leaderboards: true,
    announcements: true,
    general: true,
    lounges: true,
    marketplace: true,
    resources: false
  });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const menuRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const channelGroups = [
     {
      id: 'leaderboards',
      title: "LEADERBOARDS",
      icon: Trophy,
      channels: [
        { 
          path: '/community/leaderboards', 
          name: 'Top Rankings', 
          icon: Trophy,
          // members: 1250 
        }
      ]
    },
    {
      id: 'announcements',
      title: 'ANNOUNCEMENTS',
      icon: Megaphone,
      channels: [
        { 
          path: '/community/announcements', 
          name: 'Announcements', 
          icon: Bell, 
          locked: true, 
          badge: '3' 
        },
        { 
          path: '/community/m-adverts', 
          name: 'M-Adverts', 
          icon: ShoppingBag, 
          locked: true, 
          badge: '2' 
        }
      ]
    },
    {
      id: 'general',
      title: 'GENERAL',
      icon: MessageSquare,
      channels: [
        { 
          path: '/community/channel/general', 
          name: 'General', 
          icon: MessageSquare, 
          members: 1247 
        },
        { 
          path: '/community/channel/introductions', 
          name: 'Introductions', 
          icon: UserPlus, 
          members: 432 
        }
      ]
    },
    {
      id: 'lounges',
      title: 'LOUNGES',
      icon: Users,
      channels: [
        { 
          path: '/community/channel/buyers-lounge', 
          name: 'Buyers Lounge', 
          icon: ShoppingBag, 
          members: 856 
        },
        { 
          path: '/community/channel/sellers-lounge', 
          name: 'Sellers Lounge', 
          icon: TrendingUp, 
          members: 643 
        },
        { 
          path: '/community/channel/freelancers-lounge', 
          name: 'Freelancers Lounge', 
          icon: Briefcase, 
          members: 389 
        }
      ]
    },
    {
      id: 'marketplace',
      title: 'MARKETPLACE',
      icon: ShoppingBag,
      channels: [
        { 
          path: '/community/channel/gigs-marketplace', 
          name: 'Gigs & Services', 
          icon: Briefcase, 
          members: 234 
        },
        { 
          path: '/community/channel/deals', 
          name: 'Hot Deals', 
          icon: Sparkles, 
          members: 567, 
          badge: '5' 
        },
        { 
          path: '/community/channel/requests', 
          name: 'Buyer Requests', 
          icon: HelpCircle, 
          members: 178 
        }
      ]
    },
    {
      id: 'resources',
      title: 'RESOURCES',
      icon: BookOpen,
      channels: [
        { 
          path: '/community/channel/guides', 
          name: 'Guides & Tutorials', 
          icon: BookOpen, 
          members: 312 
        },
        { 
          path: '/community/channel/faq', 
          name: 'FAQ', 
          icon: HelpCircle, 
          members: 89 
        },
        { 
          path: '/community/channel/feedback', 
          name: 'Feedback', 
          icon: BarChart3, 
          members: 156 
        }
      ]
    }
  ];

  // Additional navigation items
  const navItems = [
    { path: '/community', icon: Home, label: 'Home', end: true },
    { path: '/community/members', icon: Users, label: 'Members' },
    { path: '/community/events', icon: Calendar, label: 'Events' },
    { path: '/community/polls', icon: BarChart3, label: 'Polls' }
  ];

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleCreateChannel = (newChannel) => {
    // Here you would typically make an API call to create the channel
    console.log('Creating new channel:', newChannel);
    
    // You can also navigate to the new channel after creation
    // navigate(`/community/channel/${newChannel.id}`);
    
    // Show success message (you can add a toast notification here)
    alert(`Channel "${newChannel.name}" created successfully!`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky inset-y-0 md:top-20 z-50
        bg-white pt-16 md:pt-0 pb-0 md:h-[calc(100vh-80px)]
        flex flex-col transition-all duration-300
        border-r border-gray-200 overflow-hidden
        ${isOpen ? 'w-64' : 'w-0'}
      `}>

        <div className="flex-1 h-full overflow-y-auto bg-[#F9FAFB]">
          {/* Channels by Group */}
          <div className="space-y-6 p-4">
            {channelGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span>{group.title}</span>
                  </div>
                  {expandedGroups[group.id] ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>

                {/* Channels */}
                {expandedGroups[group.id] && (
                  <div className="space-y-0.5 mt-1">
                    {group.channels.map((channel) => (
                      <div key={channel.path} className="relative group/channel">
                        <NavLink
                          to={channel.path}
                          onClick={handleNavClick}
                          className={({ isActive }) => `
                            w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all
                            ${isActive 
                              ? 'bg-blue-50 text-blue-600 font-semibold' 
                              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <channel.icon size={18} className="shrink-0" />
                            <span className="truncate">{channel.name}</span>
                            {channel.locked && <Lock size={12} className="shrink-0 text-gray-400" />}
                          </div>
                          <div className="flex items-center gap-2 shrink-0 pr-6">
                            {channel.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] bg-blue-600 text-white rounded-full min-w-[18px] text-center">
                                {channel.badge}
                              </span>
                            )}
                            {channel.members && (
                              <span className="text-xs text-gray-400">
                                {channel.members}
                              </span>
                            )}
                          </div>
                        </NavLink>

                        {/* Channel Options Button */}
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === channel.path ? null : channel.path);
                          }}
                          className={`
                            absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 text-gray-400 transition-opacity
                            ${openMenuId === channel.path ? 'opacity-100 bg-gray-100' : 'opacity-100 md:opacity-0 group-hover/channel:opacity-100'}
                          `}
                        >
                          <MoreVertical size={14} />
                        </button>

                        {/* Channel Dropdown Menu */}
                        {openMenuId === channel.path && (
                          <div 
                            ref={menuRef}
                            className="absolute left-full top-0 ml-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl p-1 z-[60] animate-popup-in"
                          >
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                              <BellOff size={14} />
                              <span>Mute Channel</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                              <LinkIcon size={14} />
                              <span>Copy Link</span>
                            </button>
                            <div className="my-1 border-t border-gray-100"></div>
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <LogOut size={14} />
                              <span>Leave Channel</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Create Channel Button */}
            {/* <button className="w-full mt-4 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-primary hover:text-primary flex items-center justify-center gap-2 transition-colors"
              onClick={() => setIsCreateChannelModalOpen(true)}
            >
              <Plus size={16} />
              Create Channel
            </button> */}
          </div>

          {/* Community Stats */}
          {/* <div className="mt-auto p-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-xs">
                <Users size={14} className="text-gray-500" />
                <span className="font-medium">1,247 members</span>
              </div>
              <div className="flex items-center gap-2 text-xs mt-1.5">
                <Award size={14} className="text-gray-500" />
                <span className="font-medium">89 online now</span>
              </div>
            </div>
          </div> */}
        </div>
      </aside>

      {/* Create Channel Modal */}
      <CreateChannelModal
        isOpen={isCreateChannelModalOpen}
        onClose={() => setIsCreateChannelModalOpen(false)}
        onCreateChannel={handleCreateChannel}
      />
    </>
  );
};

export default CommunitySidebar;