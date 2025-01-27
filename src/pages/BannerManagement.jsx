import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import AddBannerModal from '../partials/modals/AddBannerModal';
import { uploadBanner, updateBanner, deleteBanner } from '../api/banner';
import toast from 'react-hot-toast';

function BannerManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [banners, setBanners] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({
    banner: null
  });

  const handleAddBanner = () => {
    setIsEditing(false);
    setSelectedBanner(null);
    setNewBanner({
      banner: null
    });
    setModalOpen(true);
  };

  const handleEditBanner = (banner) => {
    setIsEditing(true);
    setSelectedBanner(banner);
    setNewBanner({
      banner: null
    });
    setModalOpen(true);
  };

  const handleSubmitBanner = async (e) => {
    e.preventDefault();
    try {
      if (!newBanner.banner) {
        toast.error('Please select a banner image');
        return;
      }

      if (isEditing && selectedBanner) {
        await updateBanner(selectedBanner._id, newBanner.banner);
        toast.success('Banner updated successfully');
      } else {
        await uploadBanner(newBanner.banner);
        toast.success('Banner added successfully');
      }

      setModalOpen(false);
      // Refresh banners list if needed
    } catch (error) {
      toast.error(error.message || 'Failed to save banner');
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    if (!bannerId) {
      toast.error('Invalid banner ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await deleteBanner(bannerId);
        toast.success('Banner deleted successfully');
        // Refresh banners list if needed
      } catch (error) {
        toast.error(error.message || 'Failed to delete banner');
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Hero Banners</h1>
              </div>

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

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map(banner => (
                <div key={banner._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="relative aspect-video">
                    <img 
                      src={banner.url} 
                      alt="Banner"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditBanner(banner)}
                        className="text-violet-500 hover:text-violet-600"
                      >
                        <span className="sr-only">Edit</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(banner._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <span className="sr-only">Delete</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <AddBannerModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={handleSubmitBanner}
        newBanner={newBanner}
        setNewBanner={setNewBanner}
        isEditing={isEditing}
      />
    </div>
  );
}

export default BannerManagement;
