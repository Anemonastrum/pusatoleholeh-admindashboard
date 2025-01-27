import React, { useState, useEffect } from 'react';
import Transition from '../../utils/Transition';
import { getCategories, getProductsByCategory } from '../../api/category';
import toast from 'react-hot-toast';

function AddBlogModal({
  modalOpen,
  setModalOpen,
  onSubmit,
  newBlog,
  setNewBlog,
  isEditing = false
}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const categoriesData = await getCategories();
        console.log('Categories data:', categoriesData); // Debug log
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        toast.error('Failed to load categories. Please try again.');
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    if (modalOpen) { // Only fetch when modal is open
      fetchCategories();
    }
  }, [modalOpen]);

  // Fetch products when category changes
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (newBlog.categoryId) {
        try {
          setIsLoadingProducts(true);
          const products = await getProductsByCategory(newBlog.categoryId);
          console.log('Products data:', products); // Debug log
          setCategoryProducts(products);
        } catch (error) {
          console.error('Failed to fetch products:', error);
          toast.error('Failed to load products. Please try again.');
          setCategoryProducts([]);
        } finally {
          setIsLoadingProducts(false);
        }
      } else {
        setCategoryProducts([]);
      }
    };

    if (modalOpen && newBlog.categoryId) { // Only fetch when modal is open and category is selected
      fetchCategoryProducts();
    }
  }, [newBlog.categoryId, modalOpen]);

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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-auto max-w-2xl w-full max-h-full">
          {/* Modal header */}
          <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800 dark:text-gray-100">
                {isEditing ? 'Edit Article' : 'Add New Article'}
              </div>
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
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="title">
                    Title
                  </label>
                  <input
                    id="title"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="category">
                    Category
                  </label>
                  {isLoadingCategories ? (
                    <div className="text-sm text-gray-500">Loading categories...</div>
                  ) : (
                    <select
                      id="category"
                      className="form-select w-full"
                      required
                      value={newBlog.categoryId}
                      onChange={(e) => {
                        setNewBlog({ 
                          ...newBlog, 
                          categoryId: e.target.value,
                          productIds: [] // Reset selected products when category changes
                        });
                        setSelectedProducts([]);
                      }}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Products */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                    Related Products
                  </label>
                  {isLoadingProducts ? (
                    <div className="text-sm text-gray-500">Loading products...</div>
                  ) : newBlog.categoryId ? (
                    categoryProducts.length > 0 ? (
                      <select
                        multiple
                        className="form-multiselect w-full"
                        value={selectedProducts}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions, option => option.value);
                          setSelectedProducts(selected);
                          setNewBlog({ ...newBlog, productIds: selected });
                        }}
                      >
                        {categoryProducts.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-gray-500">No products available in this category</div>
                    )
                  ) : (
                    <div className="text-sm text-gray-500">Please select a category first</div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="content">
                    Content
                  </label>
                  <textarea
                    id="content"
                    className="form-textarea w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    rows="8"
                    required
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    placeholder="Write your article content here..."
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="coverImage">
                    Cover Image
                  </label>
                  <input
                    id="coverImage"
                    className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.files[0] })}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Recommended size: 1200x630px
                  </p>
                  {newBlog.coverImage && (
                    <div className="mt-2">
                      <img
                        src={typeof newBlog.coverImage === 'string' ? newBlog.coverImage : URL.createObjectURL(newBlog.coverImage)}
                        alt="Cover preview"
                        className="max-h-32 rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Article Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="images">
                    Article Images
                  </label>
                  <input
                    id="images"
                    className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setNewBlog({ ...newBlog, images: files });
                    }}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    You can select up to 5 images
                  </p>
                  {newBlog.images && newBlog.images.length > 0 && (
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {Array.from(newBlog.images).map((image, index) => (
                        <img
                          key={index}
                          src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="h-20 w-full rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    className="form-checkbox"
                    checked={newBlog.active}
                    onChange={(e) => setNewBlog({ ...newBlog, active: e.target.checked })}
                  />
                  <label className="text-sm text-gray-800 dark:text-gray-300 ml-2" htmlFor="active">
                    Publish immediately
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
                  {isEditing ? 'Update Article' : 'Create Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default AddBlogModal;
