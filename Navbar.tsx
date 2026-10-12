import React, { useState } from 'react';
import { useApp } from './AppContext';
import { Stethoscope, Calendar, LogIn, Menu, X, Award, User, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRole, currentUser, switchRole, openModal, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Conditions', href: '#conditions-treated' },
    { label: 'PMR Advantage', href: '#pmr-advantage' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Insights', href: '#dynamic-blogs' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentRole !== 'public') {
      switchRole('public');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.25rem]">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => switchRole('public')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-600/20 group-hover:shadow-md transition-shadow">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-[1.05rem] font-bold tracking-tight text-slate-900">
                  DrRehab<span className="text-teal-600">AtHome</span>
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 tracking-wide">
                Founded by Dr. Dharshan N A, MD (PMR)
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-2 text-[13px] font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50/70 rounded-lg transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => openModal('book')}
              className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-[13px] font-semibold rounded-xl shadow-sm shadow-teal-700/15 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Assessment
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-slate-300 transition text-[13px] font-medium cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-slate-800 max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="font-semibold text-sm text-slate-900">{currentUser.name}</div>
                      <div className="text-xs text-teal-700 font-medium mt-0.5">{currentUser.title || currentUser.role.toUpperCase()}</div>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        switchRole(currentUser.role);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium flex items-center gap-2.5"
                    >
                      <User className="w-4 h-4" />
                      Go to Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        switchRole('public');
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 font-medium"
                    >
                      View public website
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-medium"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openModal('login')}
                className="px-3.5 py-2.5 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-800 text-[13px] font-medium rounded-xl transition flex items-center gap-1.5 cursor-pointer bg-white hover:bg-teal-50/50"
              >
                <LogIn className="w-3.5 h-3.5" />
                Portal
              </button>
            )}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => openModal('book')}
              className="px-3 py-2 bg-teal-700 text-white text-xs font-semibold rounded-lg"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 bg-white">
            <div className="flex flex-col gap-0.5">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800 rounded-lg"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 mt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal('login');
                  }}
                  className="w-full py-2.5 px-3 text-sm font-medium text-center border border-slate-200 rounded-xl text-slate-800 hover:bg-slate-50"
                >
                  Portal Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
