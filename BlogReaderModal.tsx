import React, { useState } from 'react';
import { useApp } from './AppContext';
import { X, Calendar, Clock, Eye, MessageSquare, Share2, Award, User, Send, CheckCircle2 } from 'lucide-react';
import { addBlogComment } from './api';

export const BlogReaderModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, showToast, triggerRefresh } = useApp();
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  if (activeModal !== 'blog_reader' || !modalPayload) return null;

  const blog = modalPayload;

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      await addBlogComment(blog.id, commentAuthor || 'Guest Reader', commentText);
      showToast('Comment submitted and posted to clinical article!', 'success');
      if (!blog.comments) blog.comments = [];
      blog.comments.push({
        id: `c-${Date.now()}`,
        author: commentAuthor || 'Guest Reader',
        date: new Date().toISOString().split('T')[0],
        text: commentText
      });
      setCommentText('');
      setCommentAuthor('');
      triggerRefresh();
    } catch (e) {
      showToast('Failed to post comment', 'error');
    } finally {
      setSubmittingComment(false);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Article link copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Top Sticky Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              {blog.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {blog.readTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyShareLink}
              title="Share article"
              className="p-1.5 text-slate-500 hover:text-teal-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeModal}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={blog.author?.avatar || '/dr-dharshan.jpg'}
                  alt={blog.author?.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/30"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {blog.author?.name}
                    <Award className="w-3 h-3 text-teal-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">{blog.author?.title}</div>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-3 ml-auto">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {blog.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {blog.views || 1420} views
                </span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {blog.coverImage && (
            <div className="rounded-xl overflow-hidden shadow-sm max-h-80 w-full">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Clinical Lead Note */}
          <div className="p-4 bg-teal-50/70 border-l-4 border-teal-500 rounded-r-xl text-xs text-teal-950 leading-relaxed">
            <span className="font-bold text-teal-900 block mb-1 uppercase tracking-wider text-[10px]">
              Clinical Key Takeaway:
            </span>
            {blog.summary}
          </div>

          {/* Body Content */}
          <div className="text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
            {blog.content}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-400 mr-1">Medical Topics:</span>
              {blog.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* PMR Doctor Oversight Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                PhysioPMR Medical Assurance
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                All clinical insights are written and verified by our Physical Medicine & Rehabilitation physicians.
              </p>
            </div>
            <button
              onClick={() => {
                closeModal();
                const el = document.querySelector('#role-of-pmr');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg shrink-0 cursor-pointer"
            >
              Learn More
            </button>
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-teal-600" />
              Physician & Patient Discussions ({blog.comments?.length || 0})
            </h3>

            {/* Comment list */}
            <div className="space-y-3 mb-6">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment: any, idx: number) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {comment.author}
                      </span>
                      <span className="text-[10px] text-slate-400">{comment.date}</span>
                    </div>
                    <p className="text-slate-700 leading-normal">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic py-2">
                  No comments yet. Have a clinical question about this condition? Ask below.
                </div>
              )}
            </div>

            {/* Leave a comment form */}
            <form onSubmit={handleCommentSubmit} className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-800">Leave a Question / Comment:</div>
              <input
                type="text"
                placeholder="Your name or affiliation (e.g. Caregiver, Patient, Orthopedic Dr.)"
                value={commentAuthor}
                onChange={e => setCommentAuthor(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about this therapy protocol..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
