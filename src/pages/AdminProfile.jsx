import React, { useState } from 'react';
import { UserCog, Mail, Phone, MapPin, Shield, Calendar } from 'lucide-react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function AdminProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Profile</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-violet-100 dark:bg-violet-900/50 p-3 rounded-full">
                  <UserCog className="h-8 w-8 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">John Doe</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Super Admin</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-800 dark:text-gray-100">john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-gray-800 dark:text-gray-100">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-gray-800 dark:text-gray-100">San Francisco, CA</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Permissions</h3>
                    <div className="space-y-2">
                      {['User Management', 'Content Management', 'System Settings', 'Analytics Access'].map((permission) => (
                        <div key={permission} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-gray-700 dark:text-gray-300">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex space-x-4">
                <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-colors duration-150">
                  Edit Profile
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-150">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminProfile;
