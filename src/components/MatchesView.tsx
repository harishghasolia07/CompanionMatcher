import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { User, Match } from '../types';
import { getInterestEmoji } from '../data/interests';
import { Search, Star, Users, UserCheck, UserPlus, Trophy } from 'lucide-react';

interface MatchesViewProps {
  currentUser: User | null;
}

export const MatchesView: React.FC<MatchesViewProps> = ({ currentUser }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [userInput, setUserInput] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [shortlistedUsers, setShortlistedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (currentUser) {
      // Only auto-search if user just created a profile, not on page refresh
      // We can detect this by checking if we're coming from profile creation
      const isFromProfileCreation = sessionStorage.getItem('justCreatedProfile');
      if (isFromProfileCreation) {
        setUserInput(currentUser.name);
        findMatches(currentUser.name);
        sessionStorage.removeItem('justCreatedProfile');
      }
    }
  }, [currentUser]);

  const findMatches = async (username: string) => {
    setLoading(true);
    try {
      const foundMatches = userService.findMatches(username);
      const user = userService.getUserByName(username);

      setMatches(foundMatches);
      setSelectedUser(user || null);

      // Update shortlisted users
      const shortlisted = new Set<string>();
      foundMatches.forEach(match => {
        if (userService.isUserShortlisted(match.user.id)) {
          shortlisted.add(match.user.id);
        }
      });
      setShortlistedUsers(shortlisted);
    } catch (error) {
      console.error('Error finding matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      findMatches(userInput);
    }
  };

  const handleShortlist = (userId: string) => {
    if (shortlistedUsers.has(userId)) {
      userService.removeFromShortlist(userId);
      setShortlistedUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    } else {
      userService.shortlistUser(userId);
      setShortlistedUsers(prev => new Set(prev).add(userId));
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Discover Amazing People
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Find companions who share your passions and interests</p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your name to find matches..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                'Find Matches'
              )}
            </button>
          </form>
        </div>

        {/* Current User Info */}
        {selectedUser && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                {selectedUser.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Age: {selectedUser.age}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800"
                    >
                      <span>{getInterestEmoji(interest)}</span>
                      <span className="capitalize">{interest}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Matches Results */}
        {matches.length > 0 && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {matches.length} Perfect {matches.length === 1 ? 'Match' : 'Matches'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Sorted by compatibility score and shared interests</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match, index) => (
                <div
                  key={match.user.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  {/* Match Rank Badge */}
                  {index < 3 && (
                    <div className="flex justify-end mb-2">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        {index === 0 ? <Trophy className="w-4 h-4 text-white" /> : <Star className="w-4 h-4 text-white fill-current" />}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {match.user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{match.user.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Age: {match.user.age}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-sm font-bold ${getMatchScoreColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Common Interests ({match.commonInterests.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {match.commonInterests.map((interest) => (
                        <span
                          key={interest}
                          className="inline-flex items-center space-x-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-xs font-medium border border-green-200 dark:border-green-800"
                        >
                          <span>{getInterestEmoji(interest)}</span>
                          <span className="capitalize">{interest}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">All Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      {match.user.interests.map((interest) => (
                        <span
                          key={interest}
                          className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${match.commonInterests.includes(interest)
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600'
                            }`}
                        >
                          <span>{getInterestEmoji(interest)}</span>
                          <span className="capitalize">{interest}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleShortlist(match.user.id)}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${shortlistedUsers.has(match.user.id)
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    {shortlistedUsers.has(match.user.id) ? (
                      <div className="flex items-center justify-center space-x-2">
                        <UserCheck className="w-4 h-4" />
                        <span>Added to Favorites</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Add to Favorites</span>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Matches Message */}
        {selectedUser && matches.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-400 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">No Matches Found</h2>
            <p className="text-gray-500 dark:text-gray-500 max-w-lg mx-auto">
              No users found with at least 2 common interests. Try creating a different profile or check back later for new members!
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <h2 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">Finding Your Perfect Matches</h2>
            <p className="text-gray-500 dark:text-gray-500">Analyzing compatibility and shared interests...</p>
          </div>
        )}
      </div>
    </div>
  );
};