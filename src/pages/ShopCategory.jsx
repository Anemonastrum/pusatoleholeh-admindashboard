import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import AddCategoryModal from '../partials/modals/AddCategoryModal';

function ShopCategory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      icon: '/path/to/electronics-icon.png',
      active: true,
      productsCount: 150
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Clothing and accessories',
      icon: '/path/to/fashion-icon.png',
      active: true,
      productsCount: 75
    },
  ]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: null,
    active: true
  });

  const handleAddCategory = () => {
    setIsEditing(false);
    setNewCategory({
      name: '',
      description: '',
      icon: null,
      active: true
    });
    setModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setIsEditing(true);
    setNewCategory({
      ...category,
      icon: null // Reset icon to prevent showing old file input
    });
    setModalOpen(true);
  };

  const handleSubmitCategory = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCategories(categories.map(cat => 
        cat.id === newCategory.id ? { ...newCategory, icon: newCategory.icon || cat.icon } : cat
      ));
    } else {
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      setCategories([...categories, { ...newCategory, id: newId, productsCount: 0 }]);
    }
    setModalOpen(false);
    setNewCategory({
      name: '',
      description: '',
      icon: null,
      active: true
    });
  };

  const handleToggleActive = (id) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, active: !category.active } : category
    ));
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
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
                    <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/20">
                      <tr>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Description</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Products</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Status</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-right">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {categories.map(category => (
                        <tr key={category.id}>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {category.icon && (
                                <img src={category.icon} alt="" className="w-6 h-6 rounded-full mr-2" />
                              )}
                              <div className="font-medium text-gray-800 dark:text-gray-100">{category.name}</div>
                            </div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3">
                            <div className="text-left max-w-xs truncate">{category.description}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="text-left font-medium text-sky-500">{category.productsCount}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleActive(category.id)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                category.active 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {category.active ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="flex items-center justify-end space-x-3">
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-red-500 hover:text-red-600"
                              >
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
