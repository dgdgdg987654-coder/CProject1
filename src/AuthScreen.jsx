import { useState } from 'react';
import './AuthScreen.css';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Placeholder for actual auth logic
    alert(isLogin ? `Logged in as ${formData.email}` : `Account created for ${formData.email}`);
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#4F46E5" />
            <path
              d="M13 20a7 7 0 1 1 14 0 7 7 0 0 1-14 0z"
              fill="white"
              fillOpacity="0.3"
            />
            <circle cx="20" cy="17" r="4" fill="white" />
            <path
              d="M11 30c0-4.418 4.03-8 9-8s9 3.582 9 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create an account'}</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Sign in to your account to continue.' : 'Fill in the details below to get started.'}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="field-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                autoComplete="name"
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
          )}

          <div className="field-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              autoComplete="email"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="password">
              Password
              {isLogin && (
                <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              )}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="field-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'input-error' : ''}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="error-msg">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button type="submit" className="btn-primary">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="switch-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button className="switch-btn" onClick={switchMode}>
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
