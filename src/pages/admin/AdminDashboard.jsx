import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, TrendingUp, UserCheck, Inbox, ArrowRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../utils/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/enquiries/stats')
      .then(res => { setStats(res.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Total Enquiries', value: stats.total, icon: MessageSquare, color: 'bg-royal-800', change: 'All time' },
    { label: 'New', value: stats.newCount, icon: Inbox, color: 'bg-gold-500', change: 'Needs attention' },
    { label: 'In Progress', value: stats.inProgress, icon: TrendingUp, color: 'bg-blue-600', change: 'Being processed' },
    { label: 'Enrolled', value: stats.enrolled, icon: UserCheck, color: 'bg-green-600', change: 'Converted' },
  ] : [];

  const chartData = stats?.byMonth?.reverse().map(m => ({
    name: MONTH_NAMES[(m._id.month - 1)],
    count: m.count
  })) || [];

  const COLORS = ['#2828a0', '#f59e0b', '#0d9488', '#7c3aed', '#e11d48'];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-royal-800 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {cards.map(({ label, value, icon: Icon, color, change }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`${color} w-11 h-11 rounded-xl flex items-center justify-center shadow`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-2xl font-display font-bold text-gray-800">{value}</span>
                </div>
                <p className="font-semibold text-gray-700 text-sm">{label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Monthly chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-display font-bold text-royal-900 mb-5">Enquiries by Month</h3>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#2828a0" />
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="text-gray-400 text-sm text-center py-10">No data available.</p>}
            </div>

            {/* By course */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-display font-bold text-royal-900 mb-5">Enquiries by Course</h3>
              {stats?.byCourse?.length ? (
                <div className="space-y-3">
                  {stats.byCourse.map((c, i) => (
                    <div key={c._id} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700 font-medium">{c._id}</span>
                          <span className="text-sm font-bold text-gray-800">{c.count}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{
                            width: `${(c.count / stats.total) * 100}%`,
                            background: COLORS[i % COLORS.length]
                          }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-400 text-sm text-center py-10">No data yet.</p>}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-display font-bold text-royal-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/enquiries" className="btn-primary flex items-center gap-2 text-sm py-2.5">
                Manage Enquiries <ArrowRight size={14} />
              </Link>
              <Link to="/admin/gallery" className="btn-outline flex items-center gap-2 text-sm py-2.5">
                Manage Gallery <ArrowRight size={14} />
              </Link>
              <Link to="/enquiry" className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                View Enquiry Form <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
