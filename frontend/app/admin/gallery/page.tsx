"use client";

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GALLERY_ITEMS } from '@/lib/graphql/queries';
import { DELETE_GALLERY_ITEM } from '@/lib/graphql/mutations';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Plus, Trash2, Eye, Image as ImageIcon, Edit } from 'lucide-react';

export default function AdminGallery() {
  const { isAdmin } = useAuth();
  
  const { data, loading, error, refetch } = useQuery(GET_GALLERY_ITEMS);
  const [deleteGalleryItem] = useMutation(DELETE_GALLERY_ITEM);

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
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await deleteGalleryItem({
          variables: { id },
          update: (cache) => {
            cache.modify({
              fields: {
                galleryItems(existingItems = []) {
                  return existingItems.filter((item: any) => item.__ref !== `Gallery:${id}`);
                }
              }
            });
          }
        });
        refetch();
      } catch (err) {
        console.error('Error deleting gallery item:', err);
        alert('Failed to delete gallery item');
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
          <p className="text-red-600 mb-4">Error loading gallery: {error.message}</p>
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

  const items = data?.galleryItems || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Gallery</h1>
            <p className="text-gray-600 mt-2">Manage gallery images and content</p>
          </div>
          <Link
            href="/admin/gallery/create"
            className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Image
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No gallery items found</p>
              <Link
                href="/admin/gallery/create"
                className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
              >
                Add First Image
              </Link>
            </div>
          ) : (
            items.map((item: any) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  {item.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(item.uploadedAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/gallery`}
                        className="text-gray-400 hover:text-gray-600"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/gallery/${item.id}/edit`}
                        className="text-gray-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
