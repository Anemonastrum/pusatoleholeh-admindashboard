import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import AddBlogModal from '../partials/modals/AddBlogModal';
import { getAllArticles, createArticle, updateArticle, deleteArticle, uploadArticleCover, uploadArticleImages } from '../api/article';
import { getAllCategories, getCategories } from '../api/category';
import toast from 'react-hot-toast';

function BlogManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    categoryId: '',
    productIds: [],
    coverImage: null,
    images: []
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [articlesData, categoriesData] = await Promise.all([
          getAllArticles(),
          getCategories()
        ]);
        
        setArticles(articlesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(error.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddBlog = () => {
    setIsEditing(false);
    setNewBlog({
      title: '',
      content: '',
      categoryId: '',
      productIds: [],
      coverImage: null,
      images: []
    });
    setModalOpen(true);
  };

  const handleEditBlog = (article) => {
    setIsEditing(true);
    setNewBlog({
      _id: article._id,
      title: article.title,
      content: article.content,
      categoryId: article.categoryId._id,
      productIds: article.productIds.map(product => product._id),
      coverImage: article.cover?.url || null,
      images: article.images || []
    });
    setModalOpen(true);
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    try {
      let response;
      const articleData = {
        title: newBlog.title,
        content: newBlog.content,
        categoryId: newBlog.categoryId,
        productIds: newBlog.productIds
      };

      if (isEditing) {
        response = await updateArticle(newBlog._id, articleData);
        if (newBlog.coverImage instanceof File) {
          await uploadArticleCover(newBlog._id, newBlog.coverImage);
        }
      } else {
        response = await createArticle(articleData);
        if (newBlog.coverImage) {
          await uploadArticleCover(response.data._id, newBlog.coverImage);
        }
      }

      // Upload article images if any
      if (newBlog.images.length > 0 && newBlog.images.some(img => img instanceof File)) {
        const newImages = newBlog.images.filter(img => img instanceof File);
        await uploadArticleImages(isEditing ? newBlog._id : response.data._id, newImages);
      }

      setModalOpen(false);
      toast.success(isEditing ? 'Article updated successfully' : 'Article created successfully');
      // Refresh articles list
      const updatedArticles = await getAllArticles();
      setArticles(updatedArticles);
    } catch (error) {
      toast.error(error.message || 'Failed to save article');
    }
  };

  const handleDeleteBlog = async (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(articleId);
        toast.success('Article deleted successfully');
        setArticles(articles.filter(article => article._id !== articleId));
      } catch (error) {
        toast.error(error.message || 'Failed to delete article');
      }
    }
  };

  const truncateText = (text, length) => {
    if (!text) return '';
    return text.length <= length ? text : text.substring(0, length) + '...';
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Articles</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <button className="btn bg-violet-500 hover:bg-violet-600 text-white" onClick={handleAddBlog}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Article</span>
                </button>
              </div>
            </div>

            {/* Articles Grid */}
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <div key={article._id} className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                    <div className="relative aspect-video">
                      {article.cover ? (
                        <img
                          src={article.cover.url}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400">No cover image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {truncateText(article.title, 50)}
                        </h2>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Category: {article.categoryId.name}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {truncateText(article.content, 120)}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {article.images?.slice(0, 3).map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt={`Article image ${index + 1}`}
                              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                            />
                          ))}
                          {article.images?.length > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs">
                              +{article.images.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditBlog(article)}
                            className="text-violet-500 hover:text-violet-600"
                          >
                            <span className="sr-only">Edit</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(article._id)}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Blog Modal */}
      <AddBlogModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={handleSubmitBlog}
        categories={categories}
        products={products}
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        isEditing={isEditing}
      />
    </div>
  );
}

export default BlogManagement;
