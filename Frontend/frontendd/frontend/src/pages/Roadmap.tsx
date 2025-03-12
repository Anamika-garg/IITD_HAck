import React, { useState } from 'react';
import { Code2, Database, Cloud, Layout, ChevronRight, CheckCircle } from 'lucide-react';

interface RoadmapStep {
  title: string;
  duration: string;
  description: string;
  skills: string[];
  resources: { title: string; url: string }[];
}

interface CareerPath {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  salary: string;
  steps: RoadmapStep[];
}

const careerPaths: CareerPath[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: <Layout className="w-6 h-6" />,
    description: 'Specialize in creating user interfaces and web applications',
    salary: '$90,000 - $150,000',
    steps: [
      {
        title: 'Fundamentals',
        duration: '3-4 months',
        description: 'Master the basics of web development',
        skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Git'],
        resources: [
          { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { title: 'JavaScript.info', url: 'https://javascript.info' }
        ]
      },
      {
        title: 'Frontend Frameworks',
        duration: '4-6 months',
        description: 'Learn modern frontend frameworks',
        skills: ['React', 'TypeScript', 'State Management', 'Testing'],
        resources: [
          { title: 'React Docs', url: 'https://react.dev' },
          { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' }
        ]
      },
      {
        title: 'Advanced Concepts',
        duration: '3-4 months',
        description: 'Master advanced frontend concepts',
        skills: ['Performance Optimization', 'Accessibility', 'Animation', 'SSR'],
        resources: [
          { title: 'Web.dev', url: 'https://web.dev' },
          { title: 'Frontend Masters', url: 'https://frontendmasters.com' }
        ]
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: <Code2 className="w-6 h-6" />,
    description: 'Build server-side applications and APIs',
    salary: '$95,000 - $160,000',
    steps: [
      {
        title: 'Programming Basics',
        duration: '3-4 months',
        description: 'Learn backend programming fundamentals',
        skills: ['Python/Node.js', 'Data Structures', 'Algorithms', 'SQL'],
        resources: [
          { title: 'Python.org', url: 'https://python.org' },
          { title: 'Node.js Docs', url: 'https://nodejs.org' }
        ]
      },
      {
        title: 'Backend Frameworks',
        duration: '4-6 months',
        description: 'Master backend frameworks and databases',
        skills: ['Django/Express.js', 'PostgreSQL', 'Redis', 'REST APIs'],
        resources: [
          { title: 'Django Project', url: 'https://djangoproject.com' },
          { title: 'Express.js', url: 'https://expressjs.com' }
        ]
      },
      {
        title: 'Advanced Backend',
        duration: '4-5 months',
        description: 'Learn advanced backend concepts',
        skills: ['System Design', 'Security', 'Caching', 'Message Queues'],
        resources: [
          { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
          { title: 'OWASP', url: 'https://owasp.org' }
        ]
      }
    ]
  },
  {
    id: 'data',
    title: 'Data Science',
    icon: <Database className="w-6 h-6" />,
    description: 'Analyze data and build ML models',
    salary: '$100,000 - $170,000',
    steps: [
      {
        title: 'Data Analysis Basics',
        duration: '3-4 months',
        description: 'Learn fundamental data analysis',
        skills: ['Python', 'Pandas', 'NumPy', 'Statistics'],
        resources: [
          { title: 'Kaggle', url: 'https://kaggle.com' },
          { title: 'DataCamp', url: 'https://datacamp.com' }
        ]
      },
      {
        title: 'Machine Learning',
        duration: '5-6 months',
        description: 'Master machine learning concepts',
        skills: ['Scikit-learn', 'TensorFlow', 'ML Algorithms', 'Feature Engineering'],
        resources: [
          { title: 'Fast.ai', url: 'https://fast.ai' },
          { title: 'TensorFlow Docs', url: 'https://tensorflow.org' }
        ]
      },
      {
        title: 'Advanced Data Science',
        duration: '4-5 months',
        description: 'Learn advanced ML and deployment',
        skills: ['Deep Learning', 'NLP', 'MLOps', 'Big Data'],
        resources: [
          { title: 'Coursera ML', url: 'https://coursera.org/learn/machine-learning' },
          { title: 'Deep Learning Book', url: 'https://deeplearningbook.org' }
        ]
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    icon: <Cloud className="w-6 h-6" />,
    description: 'Automate and manage infrastructure',
    salary: '$110,000 - $180,000',
    steps: [
      {
        title: 'Infrastructure Basics',
        duration: '3-4 months',
        description: 'Learn infrastructure and networking',
        skills: ['Linux', 'Networking', 'Shell Scripting', 'Git'],
        resources: [
          { title: 'Linux Journey', url: 'https://linuxjourney.com' },
          { title: 'Networking Basics', url: 'https://networklessons.com' }
        ]
      },
      {
        title: 'Cloud & Containers',
        duration: '4-5 months',
        description: 'Master cloud platforms and containerization',
        skills: ['AWS/Azure', 'Docker', 'Kubernetes', 'Terraform'],
        resources: [
          { title: 'AWS Training', url: 'https://aws.training' },
          { title: 'Kubernetes Docs', url: 'https://kubernetes.io/docs' }
        ]
      },
      {
        title: 'Advanced DevOps',
        duration: '4-5 months',
        description: 'Learn advanced DevOps practices',
        skills: ['CI/CD', 'Monitoring', 'Security', 'SRE Practices'],
        resources: [
          { title: 'GitLab CI', url: 'https://docs.gitlab.com/ee/ci/' },
          { title: 'Google SRE Book', url: 'https://sre.google/sre-book/table-of-contents/' }
        ]
      }
    ]
  }
];

export default function Roadmap() {
  const [selectedPath, setSelectedPath] = useState<CareerPath>(careerPaths[0]);
  const [expandedStep, setExpandedStep] = useState<number>(0);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Career Roadmaps</h1>
        
        {/* Career Path Selection */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {careerPaths.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path)}
              className={`p-6 rounded-xl text-left transition-all ${
                selectedPath.id === path.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-900 shadow hover:shadow-md hover:scale-102'
              }`}
            >
              <div className={`${
                selectedPath.id === path.id ? 'text-white' : 'text-blue-600'
              } mb-3`}>
                {path.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{path.title}</h3>
              <p className={`text-sm ${
                selectedPath.id === path.id ? 'text-blue-100' : 'text-gray-600'
              }`}>
                {path.description}
              </p>
              <p className={`text-sm font-semibold mt-2 ${
                selectedPath.id === path.id ? 'text-blue-100' : 'text-blue-600'
              }`}>
                {path.salary}
              </p>
            </button>
          ))}
        </div>

        {/* Learning Path Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Learning Path: {selectedPath.title}
          </h2>
          
          <div className="space-y-4">
            {selectedPath.steps.map((step, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedStep(expandedStep === index ? -1 : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedStep === index ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {expandedStep === index && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Learning Resources</h4>
                      <div className="space-y-2">
                        {step.resources.map((resource, resourceIndex) => (
                          <a
                            key={resourceIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}