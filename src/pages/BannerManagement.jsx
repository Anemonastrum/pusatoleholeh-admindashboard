import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import AddBannerModal from '../partials/modals/AddBannerModal';

function BannerManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [banners, setBanners] = useState([
    { id: 1, title: 'Summer Sale', image: '/path/to/image1.jpg', active: true },
    { id: 2, title: 'New Collection', image: '/path/to/image2.jpg', active: false },
  ]);
  const [newBanner, setNewBanner] = useState({
    title: '',
    image: null,
    active: true
  });

  const handleAddBanner = () => {
    setModalOpen(true);
  };

  const handleSubmitBanner = (e) => {
    e.preventDefault();
    const newId = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
    setBanners([...banners, { ...newBanner, id: newId }]);
    setModalOpen(false);
    setNewBanner({ title: '', image: null, active: true });
  };

  const handleToggleActive = (id) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, active: !banner.active } : banner
    ));
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(banner => banner.id !== id));
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Banners</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
               <FilterButton align="right" />
                <button className="btn bg-violet-500 hover:bg-violet-600 text-white" onClick={handleAddBanner}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Banner</span>
                </button>
                
              </div>
            </div>

            {/* Banner List */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">All Banners</h2>
              </header>
              <div className="p-5">
                {/* Banner Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {banners.map(banner => (
                    <div key={banner.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                      <div className="relative aspect-video">
                        <img 
                          src={banner.image} 
                          alt={banner.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{banner.title}</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleToggleActive(banner.id)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                banner.active 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {banner.active ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              onClick={() => handleDeleteBanner(banner.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Banner Modal */}
      <AddBannerModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={handleSubmitBanner}
        newBanner={newBanner}
        setNewBanner={setNewBanner}
      />
    </div>
  );
}

export default BannerManagement;
