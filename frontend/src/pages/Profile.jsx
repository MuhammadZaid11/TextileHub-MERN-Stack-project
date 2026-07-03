import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setMessage(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Profile</h1>

      {message && <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">{message}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">Profile Updated Successfully!</div>}

      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0">
            {userInfo?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{userInfo?.name}</h2>
            <p className="text-gray-500">{userInfo?.email}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold ${userInfo?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
              {userInfo?.role}
            </span>
          </div>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pt-4 border-t">
            <h3 className="font-bold text-gray-800 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="password"
                  placeholder="Leave blank to keep current"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-md">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
