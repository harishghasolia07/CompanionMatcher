import React from 'react';
import { Code, Database, Zap, Shield, Globe, Smartphone } from 'lucide-react';

export const Documentation: React.FC = () => {
  const techStack = [
    { name: 'React 18', description: 'Modern UI library with hooks', icon: '⚛️' },
    { name: 'TypeScript', description: 'Type-safe JavaScript', icon: '🔷' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: '🎨' },
    { name: 'Vite', description: 'Fast build tool and dev server', icon: '⚡' },
    { name: 'Lucide React', description: 'Beautiful icon library', icon: '🎯' }
  ];

  const features = [
    {
      icon: Code,
      title: 'Modern Architecture',
      description: 'Built with React 18, TypeScript, and modern development practices',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Database,
      title: 'Smart Matching',
      description: 'Advanced algorithm for finding compatible users based on interests',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Instant match scoring and dynamic user interactions',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Type Safety',
      description: 'Full TypeScript implementation for robust code quality',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: Globe,
      title: 'Responsive Design',
      description: 'Optimized for all devices and screen sizes',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Touch-friendly interface with smooth animations',
      gradient: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete technical guide and implementation details for the Companion Matcher application
          </p>
        </div>

        {/* Technology Stack */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="text-3xl">{tech.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{tech.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl from-blue-500/20 to-purple-500/20"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🚀 Quick Start Guide</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Prerequisites</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">N</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Node.js 18+ installed</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🌐</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Modern web browser</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Installation Steps</h3>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
                <div className="text-green-400 mb-2"># Clone the repository</div>
                <div className="text-white mb-4">git clone &lt;repository-url&gt;</div>
                <div className="text-green-400 mb-2"># Install dependencies</div>
                <div className="text-white mb-4">npm install</div>
                <div className="text-green-400 mb-2"># Start development server</div>
                <div className="text-white">npm run dev</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Scripts</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-2xl">
                  <code className="text-violet-700 dark:text-violet-300 font-semibold">npm run dev</code>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Start development server</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
                  <code className="text-orange-700 dark:text-orange-300 font-semibold">npm run build</code>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Build for production</p>
                </div>
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-2xl">
                  <code className="text-pink-700 dark:text-pink-300 font-semibold">npm run preview</code>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Preview production build</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Documentation */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🔌 API Reference</h2>
          
          <div className="space-y-8">
            <div className="border border-gray-200 dark:border-gray-600 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">POST</span>
                <code className="text-lg font-mono text-gray-800 dark:text-gray-200">/users</code>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Create a new user profile with interests</p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Request Body:</h4>
                <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`{
  "name": "Alex",
  "age": 25,
  "interests": ["music", "tech", "sports", "gaming"]
}`}
                </pre>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">GET</span>
                <code className="text-lg font-mono text-gray-800 dark:text-gray-200">/matches/:username</code>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Get compatible matches for a specific user</p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Response:</h4>
                <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`[
  {
    "user": {
      "name": "Sanya",
      "age": 24,
      "interests": ["tech", "music", "reading"]
    },
    "commonInterests": ["tech", "music"],
    "matchScore": 67
  }
]`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guide */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">📖 Usage Guide</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create Your Profile</h3>
                <p className="text-gray-600 dark:text-gray-300">Navigate to "Create Profile" and fill in your details. Select at least 2 interests for better matching opportunities.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Discover Matches</h3>
                <p className="text-gray-600 dark:text-gray-300">Use the "Find Matches" section to see compatible users. The system shows users with at least 2 shared interests.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Shortlist Favorites</h3>
                <p className="text-gray-600 dark:text-gray-300">Click "Add to Shortlist" on matches you're interested in. Shortlisted users are saved for easy access.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};