import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'dhone12@gmail.com',
    password: 'Dhoni@78901122!'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Added a minimum loading time of 1 second to prevent flash
      const [response] = await Promise.all([
        axios.post('http://localhost:3000/login', {
          emailId: formData.email,
          password: formData.password
        }),
        new Promise(resolve => setTimeout(resolve, 1000)) // Minimum loading time
      ]);

      console.log('API Response:', response.data);
      setSuccess('Login successful!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-300 text-primary-content w-[28rem] p-6">
        <div className="card-body">
          <h2 className="card-title text-center text-3xl mb-4">
            Welcome to DevTinder
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white text-lg">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered text-white mt-2 placeholder-white text-lg py-3"
                disabled={loading}
              />
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text text-white text-lg">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered text-white mt-2 placeholder-white text-lg py-3"
                disabled={loading}
              />
            </div>
            
            <div className="card-actions justify-end mt-8">
              <button
                type="submit"
                className="btn btn-accent btn-lg w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Toast notifications outside the card for better positioning */}
      <div className="toast toast-top toast-end">
        {success && (
          <div className="alert alert-success">
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;