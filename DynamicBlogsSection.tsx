import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { BookOpen, Search, Eye, MessageSquare, Clock, Calendar, ArrowRight, User, Plus, Award } from 'lucide-react';
import { fetchBlogs } from './api';
import { Blog } from './types';

export const DynamicBlogsSection: React.FC = () => {
  const { openModal, switchRole, refreshCount } = useApp();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'PMR & Physiatry',
    'Joint Replacement',
    'Neuro & Stroke',
    'Geriatric Care',
    'Spine & Ergonomics',
  ];

  useEffect(() => {
    setLoading(true);
    fetchBlogs({
      category: selectedCategory === 'All' ? undefined : selectedCategory,
      search: searchQuery || undefined,
    })
      .then(setBlogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery, refreshCount]);

  const featuredBlog = blogs.find(b => b.featured) || blogs[0];
  const regularBlogs = blogs.filter(b => b.id !== featuredBlog?.id);

  return (
    <section id="dynamic-blogs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              Dynamic Clinical Publications
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Physiatry & Home Rehabilitation Blogs
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Written and medically verified by PMR doctors and senior physical therapists. Continuously updated dynamically from our admin backend.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('blog_editor')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-teal-400" />
              Write New Blog
            </button>
            <button
              onClick={() => switchRole('admin')}
              className="px-3.5 py-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Admin CMS Console →
            </button>
          </div>
        </div>

        {/* Filter Bar: Categories + Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by topic, symptom, or author..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs font-medium">
            Loading dynamic clinical articles...
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No blogs found matching "{searchQuery}".
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Blog Highlight (if available and no narrow search) */}
            {featuredBlog && !searchQuery && selectedCategory === 'All' && (
              <div
                onClick={() => openModal('blog_reader', featuredBlog)}
                className="bg-gradient-to-br from-slate-900 to-teal-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group hover:border-teal-500/50 transition duration-200"
              >
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-white space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-teal-500 text-slate-950">
                        Featured Clinical Paper
                      </span>
                      <span className="text-xs text-teal-300 font-semibold">{featuredBlog.category}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {featuredBlog.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight group-hover:text-teal-300 transition">
                      {featuredBlog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                      {featuredBlog.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredBlog.author?.avatar}
                        alt={featuredBlog.author?.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-500/40"
                      />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          {featuredBlog.author?.name}
                          <Award className="w-3 h-3 text-teal-400" />
                        </div>
                        <div className="text-[10px] text-slate-400">{featuredBlog.author?.title}</div>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Complete Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden relative">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
                </div>
              </div>
            )}

            {/* Grid of Other Dynamic Blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery || selectedCategory !== 'All' ? blogs : regularBlogs).map(blog => (
                <div
                  key={blog.id}
                  onClick={() => openModal('blog_reader', blog)}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-teal-400/60 transition duration-200 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
                        {blog.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {blog.publishedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {blog.readTime}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition leading-snug line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {blog.summary}
                      </p>
                    </div>
                  </div>

                  {/* Footer with Author & stats */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author?.avatar}
                        alt={blog.author?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-semibold text-slate-700">
                        {blog.author?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {blog.views || 1}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {blog.comments?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
