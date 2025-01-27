import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';

function NotificationManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recipient, setRecipient] = useState('all');
  const [alertType, setAlertType] = useState('all'); // 'all', 'sellers', 'buyers'
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSendNotification = () => {
    // Handle sending notification here
    console.log('Sending notification:', { recipient, title, message });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Notification</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
              </div>
            </div>

            {/* Notification Form */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">Send New Notification</h2>
              </header>
              <div className="p-5">
                {/* Form */}
                <div className="space-y-4">
                  {/* Recipient Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1" htmlFor="recipient">
                      Recipient
                    </label>
                    <select
                      id="recipient"
                      className="form-select w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    >
                      <option value="all">All Users</option>
                      <option value="sellers">All Sellers</option>
                      <option value="buyers">All Buyers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1" htmlFor="Alert Type">
                      Alert Type
                    </label>
                    <select
                      id="Alert Type"
                      className="form-select w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg"
                      value={alertType}
                      onChange={(e) => setAlertType(e.target.value)}
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="success">Success</option>
                    </select>
                  </div>
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1" htmlFor="title">
                      Title
                    </label>
                    <input
                      id="title"
                      className="form-input w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter notification title"
                    />
                  </div>
                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="form-textarea w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg"
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter notification message"
                    ></textarea>
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      className="btn bg-violet-500 hover:bg-violet-600 text-white"
                      onClick={handleSendNotification}
                    >
                      Send Notification
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="mt-8"></div>

            {/* Recent Notifications Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Notifications <span className="text-gray-400 dark:text-gray-500 font-medium">67</span></h2>
              </header>
              <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-gray-300">
                    <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                      <tr>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Title</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Recipients</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Sent Date</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Type</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-right">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {/* Sample row */}
                      <tr>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-800 dark:text-gray-100">New Feature Announcement</div>
                        </td>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="text-left">All Users</div>
                        </td>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="text-left">Jan 3, 2025</div>
                        </td>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400">Info</div>
                        </td>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="flex justify-end">
                            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full">
                              <span className="sr-only">View</span>
                              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                <circle cx="16" cy="16" r="2" />
                                <circle cx="10" cy="16" r="2" />
                                <circle cx="22" cy="16" r="2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default NotificationManagement;
