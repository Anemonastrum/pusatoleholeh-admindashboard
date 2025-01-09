import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import { Box, Users, ShoppingBag, Ticket, FileText, Store } from 'lucide-react';

function Dashboard() {
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
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* All Products Card */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <header className="flex justify-between items-start mb-4">
                    {/* Icon */}
                    <Box className="w-8 h-8 text-violet-500" />
                  </header>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">All Products</h2>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                  <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">2,340</div>
                  </div>
                </div>
              </div>

              {/* All Users Card */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <header className="flex justify-between items-start mb-4">
                    {/* Icon */}
                    <Users className="w-8 h-8 text-violet-500" />
                  </header>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">All Users</h2>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                  <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">1,482</div>
                  </div>
                </div>
              </div>

              {/* Shops Card */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <header className="flex justify-between items-start mb-4">
                    {/* Icon */}
                    <Store className="w-8 h-8 text-violet-500" />
                  </header>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Shops</h2>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                  <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">248</div>
                  </div>
                </div>
              </div>

              {/* Vouchers Card */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <header className="flex justify-between items-start mb-4">
                    {/* Icon */}
                    <Ticket className="w-8 h-8 text-violet-500" />
                  </header>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Vouchers</h2>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                  <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">67</div>
                  </div>
                </div>
              </div>

              {/* Blog Posts Card */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <header className="flex justify-between items-start mb-4">
                    {/* Icon */}
                    <FileText className="w-8 h-8 text-violet-500" />
                  </header>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Blog Posts</h2>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                  <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">89</div>
                  </div>
                </div>
              </div>

              {/* Categories Card */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-4">
                <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <header className="flex justify-between items-start mb-4">
                    {/* Icon */}
                    <ShoppingBag className="w-8 h-8 text-violet-500" />
                  </header>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Categories</h2>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                  <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">67</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;