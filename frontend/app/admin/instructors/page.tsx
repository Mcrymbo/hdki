"use client";

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INSTRUCTORS } from '@/lib/graphql/queries';
import { DELETE_INSTRUCTOR } from '@/lib/graphql/mutations';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, User, MapPin } from 'lucide-react';

export default function AdminInstructors() {
  const { isAdmin } = useAuth();
  
  const { data, loading, error, refetch } = useQuery(GET_INSTRUCTORS);
  const [deleteInstructor] = useMutation(DELETE_INSTRUCTOR);

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
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      try {
        await deleteInstructor({
          variables: { id },
          update: (cache) => {
            cache.modify({
              fields: {
                instructors(existingInstructors = []) {
                  return existingInstructors.filter((instructor: any) => instructor.__ref !== `Instructor:${id}`);
                }
              }
            });
          }
        });
        refetch();
      } catch (err) {
        console.error('Error deleting instructor:', err);
        alert('Failed to delete instructor');
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
          <p className="text-red-600 mb-4">Error loading instructors: {error.message}</p>
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

  const instructors = data?.instructors || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Instructors</h1>
            <p className="text-gray-600 mt-2">Manage instructors and their profiles</p>
          </div>
          <Link
            href="/admin/instructors/create"
            className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Instructor
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No instructors found</p>
              <Link
                href="/admin/instructors/create"
                className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
              >
                Add First Instructor
              </Link>
            </div>
          ) : (
            instructors.map((instructor: any) => (
              <div key={instructor.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {instructor.photo && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={instructor.photo}
                      alt={instructor.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {instructor.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2 text-hdki-red" />
                      <span>{instructor.rank}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-hdki-red" />
                      <span>{instructor.dojoLocation?.name}</span>
                    </div>
                  </div>

                  {instructor.bio && (
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {instructor.bio}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/instructors`}
                        className="text-gray-400 hover:text-gray-600"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/instructors/${instructor.id}/edit`}
                        className="text-gray-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(instructor.id)}
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
