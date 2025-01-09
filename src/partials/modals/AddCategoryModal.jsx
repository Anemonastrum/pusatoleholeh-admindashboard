import React from 'react';
import Transition from '../../utils/Transition';

function AddCategoryModal({
  modalOpen,
  setModalOpen,
  onSubmit,
  newCategory,
  setNewCategory,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <>
      {/* Modal Backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      
      {/* Modal Dialog */}
      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-auto max-w-lg w-full max-h-full">
          {/* Modal header */}
          <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800 dark:text-gray-100">Add New Category</div>
              <button className="text-gray-400 hover:text-gray-500" onClick={() => setModalOpen(false)}>
                <div className="sr-only">Close</div>
                <svg className="w-4 h-4 fill-current">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                </svg>
              </button>
            </div>
          </div>
          {/* Modal content */}
          <div className="px-5 py-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="name">
                    Category Name
                  </label>
                  <input
                    id="name"
                    className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    type="text"
                    required
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="e.g., Electronics"
                  />
                </div>
                {/* Category Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-textarea w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    rows="3"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Enter category description..."
                  />
                </div>
                {/* Category Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="icon">
                    Category Icon
                  </label>
                  <input
                    id="icon"
                    className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.files[0] })}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Optional. Recommended size: 32x32px
                  </p>
                </div>
                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    className="form-checkbox"
                    checked={newCategory.active}
                    onChange={(e) => setNewCategory({ ...newCategory, active: e.target.checked })}
                  />
                  <label className="text-sm text-gray-800 dark:text-gray-300 ml-2" htmlFor="active">
                    Active
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end mt-6">
                <button
                  type="button"
                  className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-300"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-sm bg-violet-500 hover:bg-violet-600 text-white ml-3"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default AddCategoryModal;
