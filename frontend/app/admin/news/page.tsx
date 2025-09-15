"use client";

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NEWS } from '@/lib/graphql/queries';
import { DELETE_NEWS } from '@/lib/graphql/mutations';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';

export default function AdminNews() {
  const { isAdmin } = useAuth();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const { data, loading, error, refetch } = useQuery(GET_NEWS);
  const [deleteNews] = useMutation(DELETE_NEWS);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You need admin privileges to access this page.</p>
          <Link
            href="/"
            className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await deleteNews({
          variables: { id },
          update: (cache) => {
            cache.modify({
              fields: {
                news(existingNews = []) {
                  return existingNews.filter((news: any) => news.__ref !== `News:${id}`);
                }
              }
            });
          }
        });
        refetch();
      } catch (err) {
        console.error('Error deleting news:', err);
        alert('Failed to delete news article');
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error loading news: {error.message}</p>
          <button 
            onClick={() => refetch()}
            className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  const newsArticles = data?.news || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900">News Management</h1>
            <p className="text-gray-600 mt-2">Manage news articles and announcements</p>
          </div>
          <Link
            href="/admin/news/create"
            className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Article
          </Link>
        </div>

        {/* News Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {newsArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No news articles found</p>
              <Link
                href="/admin/news/create"
                className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
              >
                Create First Article
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newsArticles.map((article: any) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {article.coverImage && (
                            <div className="flex-shrink-0 h-12 w-12">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={article.coverImage}
                                alt={article.title}
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {article.content?.substring(0, 100)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {article.author?.first_name && article.author?.last_name
                              ? `${article.author.first_name} ${article.author.last_name}`
                              : article.author?.username || 'Unknown'
                            }
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          article.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/activities/news/${article.id}`}
                            className="text-gray-400 hover:text-gray-600"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/news/${article.id}/edit`}
                            className="text-gray-400 hover:text-blue-600"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="text-gray-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}