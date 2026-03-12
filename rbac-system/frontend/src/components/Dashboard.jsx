import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getArticles, createArticle, deleteArticle } from '../services/api';

const Dashboard = () => {
  const { user, logout, hasRole } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const canCreate = hasRole('admin', 'editor');
  const canDelete = hasRole('admin');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createArticle(title, content);
      setSuccess('Article created successfully!');
      setTitle('');
      setContent('');
      setShowCreateForm(false);
      fetchArticles();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create article');
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      await deleteArticle(id);
      setSuccess('Article deleted successfully!');
      fetchArticles();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete article');
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      editor: 'bg-green-100 text-green-800',
      viewer: 'bg-blue-100 text-blue-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">RBAC Dashboard</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user.role)}`}>
                {user.role.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
            {canCreate && (
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showCreateForm ? 'Cancel' : 'Create Article'}
              </button>
            )}
          </div>

          {showCreateForm && (
            <form onSubmit={handleCreateArticle} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit Article
              </button>
            </form>
          )}

          {loading ? (
            <div className="text-center py-8">Loading articles...</div>
          ) : articles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No articles found</div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 mb-2">{article.content}</p>
                      <p className="text-sm text-gray-500">
                        Created by User ID: {article.createdBy}
                      </p>
                    </div>
                    {canDelete && (
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Your Permissions</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span>View articles</span>
            </div>
            {canCreate && (
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Create articles</span>
              </div>
            )}
            {canDelete && (
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Delete articles</span>
              </div>
            )}
            {!canCreate && (
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-gray-500">Create articles (requires Editor or Admin role)</span>
              </div>
            )}
            {!canDelete && (
              <div className="flex items-center">
                <span className="text-red-600 mr-2">✗</span>
                <span className="text-gray-500">Delete articles (requires Admin role)</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
