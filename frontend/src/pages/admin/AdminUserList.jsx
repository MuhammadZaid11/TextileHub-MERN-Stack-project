import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const AdminUserList = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [userInfo, navigate]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading users');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserHandler = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting user');
      }
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Customers</h1>
      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(n => <div key={n} className="animate-pulse bg-gray-200 h-16 rounded-xl"></div>)}
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['ID', 'Name', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">#{user._id.slice(-8)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {user._id !== userInfo._id && (
                        <button onClick={() => deleteUserHandler(user._id)} className="text-red-500 hover:text-red-700 text-xs font-bold hover:underline">Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
