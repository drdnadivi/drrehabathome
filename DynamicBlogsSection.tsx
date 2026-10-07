import React, { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import { BookOpen, Clock, Eye } from 'lucide-react';
import { fetchBlogs } from './api';
import { Blog } from './types';

export const DynamicBlogsSection: React.FC = () => {
  const { openModal, refreshCount } = useApp();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'PMR & Physiatry', 'Joint Replacement', 'Neuro & Stroke', 'Geriatric Care', 'Spine & Ergonomics'];

  useEffect(() => {
    setLoading(true);
    fetchBlogs({ category: category === 'All' ? undefined : category })
      .then(setBlogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, refreshCount]);

  return (
    <section id="dynamic-blogs" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
              Clinical notes & education
            </h2>
            <p className="text-[15px] text-slate-600 mt-2 max-w-xl">
              Articles for patients and referring clinicians. Content can be managed from the admin console.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                category === c
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-500 text-sm">Loading articles…</p>
        ) : blogs.length === 0 ? (
          <p className="text-slate-500 text-sm">No articles in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.slice(0, 6).map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => openModal('blog_reader', b)}
                className="text-left bg-slate-50 hover:bg-white border border-slate-100 hover:border-teal-200 hover:shadow-sm rounded-2xl overflow-hidden transition cursor-pointer"
              >
                {b.coverImage && (
                  <div className="h-36 bg-slate-200 overflow-hidden">
                    <img src={b.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="text-[11px] font-semibold text-teal-700 mb-1">{b.category}</div>
                  <h3 className="text-[15px] font-semibold text-slate-900 leading-snug mb-2 line-clamp-2">{b.title}</h3>
                  <p className="text-[13px] text-slate-600 line-clamp-2 mb-3">{b.summary}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{b.readTime}</span>
                    <span className="inline-flex items-center gap-1"><Eye className="w-3 h-3" />{b.views || 0}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
