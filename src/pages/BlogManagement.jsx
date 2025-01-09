import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import AddBlogModal from '../partials/modals/AddBlogModal';

function BlogManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Top 10 Fashion Trends for 2025',
      author: 'Jane Smith',
      body: 'As we step into 2025, the fashion world continues to evolve...',
      coverImage: '/path/to/fashion-cover.jpg',
      blogImages: ['/path/to/fashion1.jpg', '/path/to/fashion2.jpg'],
      publishDate: '2025-01-04',
      active: true,
      views: 1250
    },
    {
      id: 2,
      title: 'Essential Style Tips for Spring',
      author: 'John Doe',
      body: 'Spring is just around the corner, and it\'s time to refresh your wardrobe...',
      coverImage: '/path/to/spring-cover.jpg',
      blogImages: ['/path/to/spring1.jpg', '/path/to/spring2.jpg'],
      publishDate: '2025-01-03',
      active: true,
      views: 980
    },
  ]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    body: '',
    coverImage: null,
    blogImages: [],
    active: true
  });

  const handleAddBlog = () => {
    setIsEditing(false);
    setNewBlog({
      title: '',
      author: '',
      body: '',
      coverImage: null,
      blogImages: [],
      active: true
    });
    setModalOpen(true);
  };

  const handleEditBlog = (blog) => {
    setIsEditing(true);
    setNewBlog({
      ...blog,
      coverImage: blog.coverImage,
      blogImages: blog.blogImages
    });
    setModalOpen(true);
  };

  const handleSubmitBlog = (e) => {
    e.preventDefault();
    if (isEditing) {
      setBlogs(blogs.map(blog => 
        blog.id === newBlog.id ? {
          ...newBlog,
          publishDate: blog.publishDate,
          views: blog.views
        } : blog
      ));
    } else {
      const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
      setBlogs([...blogs, {
        ...newBlog,
        id: newId,
        publishDate: new Date().toISOString().split('T')[0],
        views: 0
      }]);
    }
    setModalOpen(false);
    setNewBlog({
      title: '',
      author: '',
      body: '',
      coverImage: null,
      blogImages: [],
      active: true
    });
  };

  const handleToggleActive = (id) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? { ...blog, active: !blog.active } : blog
    ));
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Blog Posts</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <button className="btn bg-violet-500 hover:bg-violet-600 text-white" onClick={handleAddBlog}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Blog Post</span>
                </button>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map(blog => (
                <div key={blog.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative aspect-video">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        {truncateText(blog.title, 50)}
                      </h2>
                      <button
                        onClick={() => handleToggleActive(blog.id)}
                        className={`px-2 py-1 text-xs rounded-full ${
                          blog.active 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {blog.active ? 'Published' : 'Draft'}
                      </button>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      By {blog.author} • {blog.publishDate} • {blog.views} views
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {truncateText(blog.body, 120)}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {blog.blogImages.slice(0, 3).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Blog image ${index + 1}`}
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                          />
                        ))}
                        {blog.blogImages.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                            +{blog.blogImages.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
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
        </main>
      </div>

      {/* Add/Edit Blog Modal */}
      <AddBlogModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={handleSubmitBlog}
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        isEditing={isEditing}
      />
    </div>
  );
}

export default BlogManagement;
