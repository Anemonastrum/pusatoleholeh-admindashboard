import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import AddCategoryModal from '../partials/modals/AddCategoryModal';
import { getAllCategories, addNewCategory, updateCategory, deleteCategory, uploadCategoryImage } from '../api/category';
import toast from 'react-hot-toast';

function ShopCategory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: null
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setIsEditing(false);
    setNewCategory({
      name: '',
      description: '',
      icon: null
    });
    setModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setIsEditing(true);
    setNewCategory({
      _id: category._id,
      name: category.name,
      description: category.description,
      icon: null
    });
    setModalOpen(true);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      let response;
      
      if (isEditing && newCategory._id) {
        response = await updateCategory(newCategory._id, {
          name: newCategory.name,
          description: newCategory.description
        });
        
        if (newCategory.icon) {
          await uploadCategoryImage(newCategory._id, newCategory.icon);
        }
        
        toast.success('Category updated successfully');
      } else {
        response = await addNewCategory({
          name: newCategory.name,
          description: newCategory.description
        });
        
        if (newCategory.icon && response.category._id) {
          await uploadCategoryImage(response.category._id, newCategory.icon);
        }
        
        toast.success('Category added successfully');
      }
      
      setModalOpen(false);
      fetchCategories();
    } catch (error) {
      toast.error(error.message || 'Failed to save category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!categoryId) {
      toast.error('Invalid category ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(categoryId);
        toast.success('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        toast.error(error.message || 'Failed to delete category');
      }
    }
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Shop Categories</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <button className="btn bg-violet-500 hover:bg-violet-600 text-white" onClick={handleAddCategory}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Category</span>
                </button>
              </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">All Categories</h2>
              </header>
              <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-gray-300">
                    {/* Table header */}
                    <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/20">
                      <tr>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Description</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-right">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {categories.map(category => (
                        <tr key={category._id}>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {category.image && (
                                <img src={category.image.url} alt="" className="w-6 h-6 rounded-full mr-2" />
                              )}
                              <div className="font-medium text-gray-800 dark:text-gray-100">{category.name}</div>
                            </div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3">
                            <div className="text-left max-w-xs truncate">{category.description}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="text-violet-500 hover:text-violet-600"
                              >
                                <span className="sr-only">Edit</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category._id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <span className="sr-only">Delete</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Category Modal */}
      <AddCategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={handleSubmitCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        isEditing={isEditing}
      />
    </div>
  );
}

export default ShopCategory;
