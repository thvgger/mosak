import React, { useState } from 'react';
import { 
  Zap, 
  Copy, 
  Send, 
  Twitter, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Users,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "mosalak.app/ref/AB12CD";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Total Referrals', value: '12', trend: '+2 this week', icon: <Zap size={20} className="text-blue-600" /> },
    { label: 'Active Referrals', value: '8', trend: '+1 this week', icon: <Zap size={20} className="text-blue-600" /> },
    { label: 'Total Rewards Earned', value: '1,750', trend: '+200 this week', icon: <Zap size={20} className="text-blue-600" /> },
    { label: 'Pending Rewards', value: '300', trend: 'Processing...', icon: <Zap size={20} className="text-blue-600" />, isProcessing: true },
  ];

  const milestones = [
    { count: 5, reward: '+500 bonus points' },
    { count: 10, reward: '+1,500 bonus points' },
    { count: 25, reward: '+5,000 bonus points' },
  ];

  const referralData = [
    { email: 'sar***@email.com', status: 'Joined', reward: '-----', date: '2 days ago', statusColor: 'bg-gray-100 text-gray-600' },
    { email: 'moh***@email.com', status: 'Verified', reward: '100 points', date: '5 days ago', statusColor: 'bg-green-100 text-green-600' },
    { email: 'fat***@email.com', status: 'Active', reward: '---', date: '2 weeks ago', statusColor: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 gap-2">
        <span>Products</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Referrals</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col gap-3">
            <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
            <div className={`flex items-center text-xs font-medium ${stat.isProcessing ? 'text-gray-400' : 'text-green-600'}`}>
              {!stat.isProcessing && <TrendingUp size={14} className="mr-1" />}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Referral Link Section */}
      <div className="bg-[#E0E7FF] rounded-xl p-8 border border-blue-100">
        <h2 className="text-center text-xl font-bold text-gray-900 mb-6">Your Referral Link</h2>
        
        <div className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto mb-8">
          <div className="flex-1 bg-white border border-blue-200 rounded-lg px-4 py-3 text-blue-700 font-medium truncate">
            {referralLink}
          </div>
          <button 
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-center text-blue-800 font-bold uppercase tracking-wider text-sm">Share via</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-[#2D3748] hover:bg-gray-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors">
              <MessageCircle size={20} />
              <span>Whatsapp</span>
            </button>
            <button className="bg-[#2D3748] hover:bg-gray-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors">
              <Twitter size={20} />
              <span>X (Twitter)</span>
            </button>
            <button className="bg-[#2D3748] hover:bg-gray-800 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors">
              <Send size={20} />
              <span>Telegram</span>
            </button>
          </div>
        </div>
      </div>

      {/* How Rewards Work */}
      <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            🏆 How Rewards Work
          </h3>
          <p className="text-sm text-gray-500 mt-1">Limited-time opportunities</p>
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="text-blue-600 font-bold mb-3">Base Reward</h4>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>100 points per verified referral</li>
            </ul>
          </section>

          <section>
            <h4 className="text-blue-600 font-bold mb-4">Bonus Milestones</h4>
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700 font-medium">{m.count} referrals: {m.reward}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-blue-600 rounded-lg p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Progress to next milestone</span>
              <span className="text-sm font-bold">13 more referrals</span>
            </div>
            <div className="h-2.5 bg-blue-400/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>

          <section>
            <h4 className="text-blue-600 font-bold mb-4">Limits & Requirements</h4>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                Maximum 50 referrals per month
              </li>
              <li className="flex items-start gap-2 border-t border-gray-50 pt-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                Referred user must complete KYC verification
              </li>
              <li className="flex items-start gap-2 border-t border-gray-50 pt-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                Rewards credited within 24 hours of verification
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Referral Performance */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          <h3 className="font-bold text-gray-900">Referral Performance</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
            Invite More Friends
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Referred User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reward Earned</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {referralData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-medium text-gray-700">{row.email}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${row.statusColor}`}>
                      <Clock size={12} />
                      {row.status}
                    </span>
                  </td>
                  <td className={`px-6 py-5 text-sm font-bold ${row.reward.includes('points') ? 'text-yellow-600' : 'text-gray-400'}`}>
                    {row.reward}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referrals;

