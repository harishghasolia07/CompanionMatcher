import React, { useState } from 'react';
import { availableInterests, getInterestEmoji } from '../data/interests';
import { userService } from '../services/userService';
import { User } from '../types';
import { CheckCircle, User as UserIcon, Calendar } from 'lucide-react';

interface CreateProfileProps {
  onProfileCreated: (user: User) => void;
}

export const CreateProfile: React.FC<CreateProfileProps> = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    interests: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interests.length < 2) {
      alert('Please select at least 2 interests');
      return;
    }

    setIsSubmitting(true);

    try {
      const newUser = userService.createUser({
        name: formData.name,
        age: parseInt(formData.age),
        interests: formData.interests
      });

      setShowSuccess(true);
      setTimeout(() => {
        onProfileCreated(newUser);
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.age && formData.interests.length >= 2;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 hover:shadow-lg hover:shadow-green-200/50 dark:hover:shadow-green-900/50 transition-all duration-300 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile Created!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Your profile has been successfully created. Let's find your perfect companions!</p>
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <span className="text-sm">Finding your matches...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Your Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Tell us about yourself to connect with like-minded individuals</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <UserIcon className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Age</span>
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                  required
                />
              </div>
            </div>

            {/* Interests Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-bold text-gray-900 dark:text-white">
                  Choose Your Interests
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">(Select at least 2)</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableInterests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors
                      ${formData.interests.includes(interest)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    <span className="text-lg">{getInterestEmoji(interest)}</span>
                    <span className="text-sm font-medium capitalize">{interest}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Selected interests: <span className="font-bold text-blue-600 dark:text-blue-400">{formData.interests.length}</span>
                </span>
                {formData.interests.length >= 2 && (
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Ready to connect!</span>
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`
                  px-8 py-3 rounded-lg font-medium text-white transition-colors
                  ${isFormValid && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Your Profile...</span>
                  </div>
                ) : (
                  'Create Profile & Find Friends'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};