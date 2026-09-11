import React, { useState } from 'react';
import { addSubjectService } from '../../services/subjectService';

export default function AddSubject({ user, onAddSubject }) {
  const [formData, setFormData] = useState({
    subjectName: '',
    duration: '',
    topic: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name] || errors.apiError) {
      setErrors((prev) => ({ ...prev, [name]: '', apiError: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.subjectName.trim()) newErrors.subjectName = 'Subject name is required.';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required.';
    if (!formData.topic.trim()) newErrors.topic = 'Topic is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userId = user?.id || user?._id || localStorage.getItem('study_tracker_userId');
    if (!userId) {
      setErrors({ apiError: 'User authentication not found. Please log in.' });
      return;
    }

    try {
      setIsSubmitting(true);
      // Call backend API service
      const savedSubject = await addSubjectService(userId, formData);

      if (onAddSubject) {
        onAddSubject(savedSubject);
      }

      // Reset form on success
      setFormData({ subjectName: '', duration: '', topic: '' });
      setErrors({});
    } catch (error) {
      console.error('Failed to submit subject:', error);
      setErrors((prev) => ({
        ...prev,
        apiError: error.message || 'Failed to save subject to server. Please check backend connection.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Subject</h2>

      {errors.apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {errors.apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject Name Input */}
        <div>
          <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 mb-1">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            placeholder="e.g., Cloud Computing"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.subjectName
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'
            }`}
          />
          {errors.subjectName && (
            <p className="mt-1 text-xs text-red-500">{errors.subjectName}</p>
          )}
        </div>

        {/* Duration Input */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 40 Hours or 4 Weeks"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.duration
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'
            }`}
          />
          {errors.duration && (
            <p className="mt-1 text-xs text-red-500">{errors.duration}</p>
          )}
        </div>

        {/* Topic Input */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <textarea
            id="topic"
            name="topic"
            rows="3"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g., OSI Model, TCP/IP, Routing Algorithms"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.topic
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-500'
            }`}
          />
          {errors.topic && (
            <p className="mt-1 text-xs text-red-500">{errors.topic}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 px-4 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {isSubmitting ? 'Saving...' : 'Add Subject'}
        </button>
      </form>
    </div>
  );
}
