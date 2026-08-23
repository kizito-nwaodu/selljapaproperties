import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, ShieldCheck, ArrowRight, CheckCircle2, RefreshCw, KeyRound, Globe, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';
import { authApi } from '../services/api';
import confetti from 'canvas-confetti';

export function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState(initialMode); // 'login', 'signup', 'forgot', 'otp_verify'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign In / Sign Up fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('relocator_seller'); // 'relocator_seller' (Seller) or 'diaspora_investor' (Buyer)
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Password reset fields
  const [resetEmail, setResetEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [demoOtpNotice, setDemoOtpNotice] = useState('');

  useEffect(() => {
    setAuthMode(initialMode);
    setError('');
  }, [initialMode]);

  const handleSSO = async (provider) => {
    setLoading(true);
    setError('');
    try {
      // Pass the selected role so SSO creates or logs in as the chosen account type
      const user = await authApi.loginWithSSO(provider, role);
      confetti({ particleCount: 70, spread: 60 });
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setError('SSO authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (authMode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please re-enter your password.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      if (!agreeTerms) {
        setError('You must agree to the Terms of Service and Escrow Privacy Policy.');
        setLoading(false);
        return;
      }
    }

    try {
      let user;
      if (authMode === 'login') {
        user = await authApi.loginWithEmail(email, password, role);
      } else {
        user = await authApi.registerWithEmail({ name, email, password, phone, role });
      }
      confetti({ particleCount: 70, spread: 60 });
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setError('Authentication failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setError('Please enter your registered email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await authApi.requestPasswordResetOtp(resetEmail);
      setDemoOtpNotice(res.demoOtp);
      setAuthMode('otp_verify');
    } catch (err) {
      setError('Failed to send reset code. Please check your email address.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otpCode || !newPassword) {
      setError('Please enter the 6-digit OTP and your new password.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authApi.verifyResetOtpAndSetPassword(resetEmail, otpCode, newPassword);
      confetti({ particleCount: 60, spread: 50 });
      setAuthMode('login');
      setEmail(resetEmail);
      setError('');
    } catch (err) {
      setError('Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel-gold rounded-3xl p-6 sm:p-8 bg-[#0b1410] border border-amber-500/40 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white border border-stone-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 p-0.5 mx-auto mb-3 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#080f0c] rounded-[14px] flex items-center justify-center">
              {authMode === 'signup' ? (
                <UserPlus className="w-6 h-6 text-emerald-400" />
              ) : (
                <LogIn className="w-6 h-6 text-amber-400" />
              )}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {authMode === 'login' && "Log In to Your Account"}
            {authMode === 'signup' && "Create Your Account"}
            {authMode === 'forgot' && "Reset Your Password"}
            {authMode === 'otp_verify' && "Enter 6-Digit OTP"}
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            {authMode === 'signup'
              ? "Join SellJapa to list relocation assets or discover verified distressed properties."
              : "Access your confidential relocation dashboard, title deeds & escrow negotiations."}
          </p>
        </div>

        {/* Standard Sign Up vs Log In Tab Switcher */}
        {(authMode === 'login' || authMode === 'signup') && (
          <div className="grid grid-cols-2 gap-1 bg-stone-900/90 p-1.5 rounded-2xl border border-stone-800 mb-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setError(''); }}
              className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'login' 
                  ? 'bg-amber-500 text-stone-950 font-extrabold shadow-md' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setError(''); }}
              className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'signup' 
                  ? 'bg-emerald-600 text-white font-extrabold shadow-md' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>
        )}

        {/* Account Type Selector (Mandatory for both Login & Signup) */}
        {(authMode === 'login' || authMode === 'signup') && (
          <div className="mb-4">
            <label className="block text-[11px] font-bold text-stone-300 mb-1.5">
              Select Your Account Type:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('relocator_seller')}
                className={`p-2.5 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                  role === 'relocator_seller' 
                    ? 'bg-amber-950/70 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500/50' 
                    : 'bg-stone-900/70 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="font-extrabold flex items-center gap-1">
                  <span>🏡 Seller Account</span>
                </div>
                <div className="text-[10px] opacity-80 mt-0.5">Liquidate properties & bundles</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('diaspora_investor')}
                className={`p-2.5 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                  role === 'diaspora_investor' 
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md ring-1 ring-emerald-500/50' 
                    : 'bg-stone-900/70 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="font-extrabold flex items-center gap-1">
                  <span>💼 Buyer / Investor</span>
                </div>
                <div className="text-[10px] opacity-80 mt-0.5">Find verified relocation deals</div>
              </button>
            </div>
          </div>
        )}

        {/* Error message alert */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* SSO 1-Click Buttons */}
        {(authMode === 'login' || authMode === 'signup') && (
          <div className="space-y-2.5 mb-5">
            {/* Google SSO */}
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSSO('google')}
              className="w-full flex items-center justify-center gap-3 bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>
                {authMode === 'signup' 
                  ? `Sign Up as ${role === 'relocator_seller' ? 'Seller' : 'Buyer'} with Google` 
                  : `Log In as ${role === 'relocator_seller' ? 'Seller' : 'Buyer'} with Google`}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              {/* Apple SSO */}
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSSO('apple')}
                className="flex items-center justify-center gap-2 bg-stone-900 border border-stone-700 hover:border-stone-500 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.65-2.79 1.43-.57.66-.99 1.74-.86 2.8 1.11.08 2.05-.51 2.69-1.28z"/>
                </svg>
                <span>Apple SSO</span>
              </button>

              {/* Microsoft SSO */}
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSSO('microsoft')}
                className="flex items-center justify-center gap-2 bg-stone-900 border border-stone-700 hover:border-stone-500 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#f25022" d="M1 1h10v10H1z"/>
                  <path fill="#00a4ef" d="M1 13h10v10H1z"/>
                  <path fill="#7fba00" d="M13 1h10v10H13z"/>
                  <path fill="#ffb900" d="M13 13h10v10H13z"/>
                </svg>
                <span>Microsoft SSO</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-stone-800"></div>
              <span className="flex-shrink mx-3 text-[10px] text-stone-500 font-semibold uppercase">Or continue with email</span>
              <div className="flex-grow border-t border-stone-800"></div>
            </div>
          </div>
        )}

        {/* Standard Email & Password Form */}
        {(authMode === 'login' || authMode === 'signup') && (
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            
            {/* SIGN UP ONLY: Full Name & Phone */}
            {authMode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Full Name</label>
                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-xs">
                    <User className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Alabi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-none text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Nigerian Phone Number (WhatsApp Enabled)</label>
                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-xs">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent border-none text-white focus:outline-none w-full"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-bold text-stone-300 mb-1">Email Address</label>
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-xs">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-stone-300">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setAuthMode('forgot'); setError(''); setResetEmail(email); }}
                    className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-xs relative">
                <Lock className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none w-full pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-stone-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* SIGN UP ONLY: Confirm Password & Terms */}
            {authMode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Confirm Password</label>
                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-xs">
                    <Lock className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-transparent border-none text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer text-[11px] text-stone-300">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-emerald-500 bg-stone-900 border-stone-700 focus:ring-0"
                    />
                    <span>
                      I agree to the <span className="text-amber-400 font-semibold underline">Terms of Escrow Service</span> & <span className="text-emerald-400 font-semibold underline">Confidentiality Policy</span>.
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                role === 'relocator_seller' ? 'btn-gold' : 'btn-emerald'
              }`}
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>
                    {authMode === 'login' 
                      ? `Log In to ${role === 'relocator_seller' ? 'Seller' : 'Buyer'} Account` 
                      : `Create ${role === 'relocator_seller' ? 'Seller' : 'Buyer'} Account`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Bottom Helper Switcher */}
            <div className="text-center pt-2 text-xs text-stone-400">
              {authMode === 'login' ? (
                <span>
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signup'); setError(''); }}
                    className="text-amber-400 font-bold hover:underline cursor-pointer"
                  >
                    Sign Up Free
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setError(''); }}
                    className="text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    Log In
                  </button>
                </span>
              )}
            </div>

          </form>
        )}

        {/* FORGOT PASSWORD: Request OTP */}
        {authMode === 'forgot' && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-300 mb-1">Enter Your Registered Email</label>
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-xs">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold justify-center py-3 text-xs font-bold cursor-pointer"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Send 6-Digit Reset Code"}
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="w-full text-center text-xs text-stone-400 hover:text-white cursor-pointer"
            >
              &larr; Back to Log In
            </button>
          </form>
        )}

        {/* OTP VERIFY & NEW PASSWORD */}
        {authMode === 'otp_verify' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            
            {demoOtpNotice && (
              <div className="p-3 bg-amber-950/60 border border-amber-500/50 rounded-xl text-xs text-amber-200">
                <div className="font-bold flex items-center justify-between">
                  <span>Demo OTP Code Sent:</span>
                  <button 
                    type="button" 
                    onClick={() => setOtpCode(demoOtpNotice)}
                    className="underline text-emerald-400 font-extrabold cursor-pointer"
                  >
                    Auto-Fill {demoOtpNotice}
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-stone-300 mb-1">6-Digit Verification Code</label>
              <input
                type="text"
                maxLength="6"
                placeholder="489215"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full bg-stone-900 border border-amber-500 text-amber-300 text-center tracking-widest text-lg font-bold rounded-xl py-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-300 mb-1">New Secure Password</label>
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-xs">
                <Lock className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="password"
                  required
                  placeholder="Enter new password (min 6 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-emerald justify-center py-3 text-xs font-bold cursor-pointer"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Save New Password & Log In"}
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="w-full text-center text-xs text-stone-400 hover:text-white cursor-pointer"
            >
              &larr; Back to Log In
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
