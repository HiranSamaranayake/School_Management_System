import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, School, ArrowRight, ShieldCheck, AlertCircle, UserPlus, GraduationCap, Users, Shield } from 'lucide-react';
import { useAuth } from '../../app/context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useToast } from '../../app/context/ToastContext';
import { Modal } from '../../components/ui/Modal';
import { RegisterUserModal } from '../../components/modals/RegisterUserModal';
import { validateEmail, validatePassword } from '../../utils/validators';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [schoolCode, setSchoolCode] = useState('GIC001');
  const [email, setEmail] = useState('admin@greenfield.edu.lk');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!schoolCode.trim()) newErrors.schoolCode = "School workspace code is required (e.g. GIC001).";
    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;
    const passErr = validatePassword(password);
    if (passErr) newErrors.password = passErr;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validate()) return;

    setLoading(true);
    try {
      await login(email, password);
      addToast('Welcome Back!', `Logged into Greenfield International College (${schoolCode})`, 'success');
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email address or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRole = (roleType) => {
    if (roleType === 'admin') {
      setEmail('admin@greenfield.edu.lk');
      setPassword('demo1234');
      addToast('Role Selected: School Admin', 'Credentials set for Admin Dashboard', 'info');
    } else if (roleType === 'teacher') {
      setEmail('teacher@greenfield.edu.lk');
      setPassword('demo1234');
      addToast('Role Selected: Teacher', 'Credentials set for Teacher Portal', 'info');
    } else if (roleType === 'student') {
      setEmail('student@greenfield.edu.lk');
      setPassword('demo1234');
      addToast('Role Selected: Student', 'Credentials set for Student & Parent Portal', 'info');
    }
    setSchoolCode('GIC001');
    setErrors({});
  };

  return (
    <div className="w-full space-y-6">
      {/* Brand Header Mobile */}
      <div className="lg:hidden text-center space-y-2 mb-6">
        <div className="inline-flex w-10 h-10 rounded-xl bg-brand-600 items-center justify-center text-white font-bold text-xl shadow-md">
          E
        </div>
        <h2 className="text-2xl font-bold text-white">EduSphere</h2>
        <p className="text-xs text-slate-400">Greenfield International College</p>
      </div>

      {/* Login Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-left">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Sign in to your workspace</h2>
            <p className="text-xs text-slate-400 mt-1">Select demo role or enter account credentials</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="xs"
            icon={UserPlus}
            onClick={() => setIsRegisterModalOpen(true)}
            className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Register User
          </Button>
        </div>

        {/* Demo Role Switcher Quick Selector */}
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            1-Click Demo Role Selector
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleSelectRole('admin')}
              className={`p-2 rounded-lg border text-left transition-all text-xs flex flex-col items-center gap-1 ${
                email.includes('admin')
                  ? 'bg-brand-600/20 border-brand-500 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shield className="w-4 h-4 text-brand-400" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectRole('teacher')}
              className={`p-2 rounded-lg border text-left transition-all text-xs flex flex-col items-center gap-1 ${
                email.includes('teacher')
                  ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Teacher</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectRole('student')}
              className={`p-2 rounded-lg border text-left transition-all text-xs flex flex-col items-center gap-1 ${
                email.includes('student')
                  ? 'bg-purple-600/20 border-purple-500 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Student</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="School Workspace Code"
            icon={School}
            value={schoolCode}
            onChange={(e) => { setSchoolCode(e.target.value); if (errors.schoolCode) setErrors(p => ({ ...p, schoolCode: null })); }}
            placeholder="e.g. GIC001"
            error={errors.schoolCode}
            required
            className="bg-slate-950 border-slate-800 text-white placeholder-slate-500"
          />

          <Input
            label="Email"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: null })); }}
            placeholder="user@greenfield.edu.lk"
            error={errors.email}
            required
            className="bg-slate-950 border-slate-800 text-white placeholder-slate-500"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(p => ({ ...p, password: null })); }}
              placeholder="••••••••"
              error={errors.password}
              required
              className="bg-slate-950 border-slate-800 text-white placeholder-slate-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-7 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <Checkbox
              label="Remember this device"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="text-slate-300"
            />
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-brand-400 hover:text-brand-300 font-medium"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            aria-label="Login"
            className="w-full mt-2 font-bold shadow-lg shadow-brand-600/30"
          >
            Sign in securely
          </Button>
        </form>

        {/* Register Helper */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(true)}
            className="text-slate-400 hover:text-white font-medium flex items-center gap-1"
          >
            <UserPlus className="w-3.5 h-3.5 text-brand-400" /> New user? Register Account
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500">
        Having trouble signing in? Contact your school administrator.
      </p>

      {/* Register User Modal */}
      <RegisterUserModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title="Reset Password Instructions"
        subtitle="Password recovery for Greenfield International College"
      >
        <div className="space-y-4 text-xs text-slate-600 text-left">
          <p>
            To reset your EduSphere administrator password, please contact the EduSphere IT support desk or email <strong className="text-slate-900">support@edusphere.cloud</strong> with your school registration details.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block">School Code: GIC001</span>
            <span className="text-slate-500">Support Line: +94 11 258 9641</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
