import React, { useState } from 'react';
import { useApp } from './AppContext';
import { X, BookOpen, Save, Sparkles, Image, Tag, User } from 'lucide-react';
import { createBlog, updateBlog } from './api';
import { Blog } from './types';

export const BlogEditorModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, showToast, triggerRefresh } = useApp();
  const editingBlog: Blog | null = modalPayload;

  const [title, setTitle] = useState(editingBlog?.title || '');
  const [category, setCategory] = useState(editingBlog?.category || 'PMR & Physiatry');
  const [summary, setSummary] = useState(editingBlog?.summary || '');
  const [content, setContent] = useState(editingBlog?.content || '');
  const [authorName, setAuthorName] = useState(editingBlog?.author?.name || 'Dr. Dharshan N A, MD (PMR)');
  const [authorTitle, setAuthorTitle] = useState(editingBlog?.author?.title || 'Lead PMR Specialist (Physiatrist)');
  const [coverImage, setCoverImage] = useState(
    editingBlog?.coverImage ||
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'
  );
  const [tags, setTags] = useState(editingBlog?.tags?.join(', ') || 'PMR, Home Rehab, Recovery');
  const [submitting, setSubmitting] = useState(false);

  if (activeModal !== 'blog_editor') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide blog title and content');
      return;
    }

    setSubmitting(true);
    const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);

    try {
      if (editingBlog && editingBlog.id) {
        await updateBlog(editingBlog.id, {
          title,
          category,
          summary,
          content,
          author: {
            name: authorName,
            title: authorTitle,
            avatar: editingBlog.author?.avatar || '/dr-dharshan.jpg'
          },
          coverImage,
          tags: tagArray
        });
        showToast('Blog article updated successfully!', 'success');
      } else {
        await createBlog({
          title,
          category,
          summary,
          content,
          authorName,
          authorTitle,
          coverImage,
          tags: tagArray
        });
        showToast('New clinical blog published successfully!', 'success');
      }

      triggerRefresh();
      closeModal();
    } catch (e: any) {
      showToast(e.message || 'Failed to save blog', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-slate-900 text-white p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 bg-amber-500/20 text-amber-300 rounded-md">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Admin Dynamic Content Studio
            </span>
          </div>
          <h2 className="text-xl font-bold">
            {editingBlog ? 'Edit Clinical Blog Post' : 'Publish New Rehabilitation Blog'}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Create educational resources highlighting PMR doctor protocols and home rehabilitation breakthroughs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Article Headline *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Preventing Knee Arthrofibrosis: The 30-Day Golden Window"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Specialty Category *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white"
              >
                <option value="PMR & Physiatry">PMR & Physiatry</option>
                <option value="Joint Replacement">Joint Replacement</option>
                <option value="Neuro & Stroke">Neuro & Stroke</option>
                <option value="Geriatric Care">Geriatric Care</option>
                <option value="Spine & Ergonomics">Spine & Ergonomics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image URL</label>
              <input
                type="url"
                value={coverImage}
                onChange={e => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Author Title / Specialty</label>
              <input
                type="text"
                value={authorTitle}
                onChange={e => setAuthorTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Summary / Lead Note *</label>
            <textarea
              rows={2}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="A brief 2-sentence clinical hook explaining why this article matters for home recovery..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Article Content (Markdown supported) *</label>
            <textarea
              rows={8}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write detailed clinical guidance, recovery stages, evidence, and rehabilitation principles..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="PMR, Knee Replacement, Flexion, Home Physio"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {submitting ? 'Saving...' : editingBlog ? 'Update Blog Post' : 'Publish to Dynamic Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
