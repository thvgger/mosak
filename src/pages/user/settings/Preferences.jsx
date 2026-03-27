// import React, { useState } from 'react';
// import { 
//   Bell, 
//   Globe, 
//   Moon, 
//   Sun, 
//   Mail,
//   MessageSquare,
//   ShoppingBag,
//   Wallet,
//   Award
// } from 'lucide-react';

// const Preferences = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [language, setLanguage] = useState('en');
//   const [notifications, setNotifications] = useState({
//     email: {
//       orders: true,
//       promotions: false,
//       security: true,
//       newsletter: false
//     },
//     push: {
//       messages: true,
//       payments: true,
//       updates: false
//     }
//   });

//   const handleNotificationChange = (type, channel, setting) => {
//     setNotifications(prev => ({
//       ...prev,
//       [channel]: {
//         ...prev[channel],
//         [setting]: !prev[channel][setting]
//       }
//     }));
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-gray-800">Preferences</h1>

//       {/* Appearance */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200">
//         <h2 className="font-semibold mb-4">Appearance</h2>
        
//         <div className="flex items-center justify-between max-w-md">
//           <div className="flex items-center gap-2">
//             {darkMode ? <Moon size={18} /> : <Sun size={18} />}
//             <span>Dark Mode</span>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input 
//               type="checkbox" 
//               className="sr-only peer"
//               checked={darkMode}
//               onChange={() => setDarkMode(!darkMode)}
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
//           </label>
//         </div>
//       </div>

//       {/* Language */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200">
//         <h2 className="font-semibold mb-4 flex items-center gap-2">
//           <Globe size={18} />
//           Language
//         </h2>
        
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
//         >
//           <option value="en">English</option>
//           <option value="fr">French</option>
//           <option value="es">Spanish</option>
//           <option value="ar">Arabic</option>
//           <option value="yo">Yoruba</option>
//           <option value="ha">Hausa</option>
//           <option value="ig">Igbo</option>
//         </select>
//       </div>

//       {/* Email Notifications */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200">
//         <h2 className="font-semibold mb-4 flex items-center gap-2">
//           <Mail size={18} />
//           Email Notifications
//         </h2>

//         <div className="space-y-3">
//           {Object.entries(notifications.email).map(([key, value]) => (
//             <div key={key} className="flex items-center justify-between max-w-md">
//               <label className="text-sm capitalize">{key}</label>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input 
//                   type="checkbox" 
//                   className="sr-only peer"
//                   checked={value}
//                   onChange={() => handleNotificationChange('email', 'email', key)}
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Push Notifications */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200">
//         <h2 className="font-semibold mb-4 flex items-center gap-2">
//           <Bell size={18} />
//           Push Notifications
//         </h2>

//         <div className="space-y-3">
//           {Object.entries(notifications.push).map(([key, value]) => (
//             <div key={key} className="flex items-center justify-between max-w-md">
//               <label className="text-sm capitalize">{key}</label>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input 
//                   type="checkbox" 
//                   className="sr-only peer"
//                   checked={value}
//                   onChange={() => handleNotificationChange('push', 'push', key)}
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Preferences;