import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  BookOpen,
  Users,
  Video,
  ArrowRight,
  BarChart,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect Tech Career with{' '}
              <span className="text-blue-600">AI-Powered Guidance!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore career paths, get personalized recommendations, and plan your future with AI.
              Your journey to success starts here.
            </p>
            <Link
              to="/quiz"
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto inline-flex"
            >
              Start Your Career Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="mt-12">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80"
            alt="AI Career Planning"
            className="rounded-xl shadow-2xl mx-auto max-w-4xl w-full object-cover"
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Take Career Quiz',
                description: 'Complete our AI-powered assessment to discover your strengths',
              },
              {
                icon: <BarChart className="w-8 h-8" />,
                title: 'Get Recommendations',
                description: 'Receive personalized career suggestions based on your profile',
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Explore Roadmaps',
                description: 'Access detailed learning paths and required skills',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Connect & Learn',
                description: 'Engage with mentors and AI consultations',
              },
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Insights */}
      <section id="careers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Top Tech Careers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Software Development',
                salary: '$105,000',
                growth: '22%',
                skills: ['JavaScript', 'Python', 'React', 'Cloud'],
              },
              {
                title: 'Data Science',
                salary: '$120,000',
                growth: '28%',
                skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
              },
              {
                title: 'DevOps Engineering',
                salary: '$115,000',
                growth: '25%',
                skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
              },
            ].map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">{career.title}</h3>
                <div className="mb-4">
                  <p className="text-gray-600">Average Salary</p>
                  <p className="text-2xl font-bold text-blue-600">{career.salary}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">Growth Rate</p>
                  <p className="text-lg font-semibold text-green-600">+{career.growth} YoY</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Key Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Guidance */}
      <section id="guidance" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Live AI Career Guidance
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Get instant answers to your career questions through our AI-powered video consultations.
                Available 24/7, our AI mentor helps you make informed decisions about your future.
              </p>
              <div className="space-y-4">
                {[
                  'Personalized career advice',
                  'Real-time industry insights',
                  'Skills gap analysis',
                  'Custom learning paths',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
                <Video className="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="jobs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Latest Job Opportunities
          </h2>
          <div className="grid gap-6">
            {[
              {
                title: 'Senior Frontend Developer',
                company: 'Tech Corp',
                location: 'Remote',
                salary: '$120,000 - $150,000',
              },
              {
                title: 'Data Scientist',
                company: 'AI Solutions',
                location: 'New York, NY',
                salary: '$130,000 - $160,000',
              },
              {
                title: 'DevOps Engineer',
                company: 'Cloud Systems',
                location: 'San Francisco, CA',
                salary: '$140,000 - $170,000',
              },
            ].map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-gray-500">{job.location}</p>
                  </div>
                  <p className="text-blue-600 font-semibold">{job.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Mapping Your Career Today!
          </h2>
          <p className="text-blue-100 text-xl mb-8">
            Join thousands of students who have found their perfect career path with our AI-powered guidance.
          </p>
          <Link
            to="/quiz"
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Take the Career Quiz
            <Trophy className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}