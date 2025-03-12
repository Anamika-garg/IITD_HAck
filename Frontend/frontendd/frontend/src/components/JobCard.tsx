import React from 'react';
import Card from '../Components/Card';
import CardContent from '../Components/CardContent';
import Button from '../Components/Button';
import { MapPin, Globe } from 'lucide-react';

const JobCard = ({ jobData }) => {
  return (
    <Card className="w-full sm:w-4/5 md:w-3/4 lg:w-4/5 mx-auto my-4 shadow-lg border border-gray-200 rounded-2xl">
      <CardContent className="p-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{jobData.title}</h2>
          <p className="text-sm text-gray-600">{jobData.company}</p>
        </div>

        <div className="flex items-center text-sm text-gray-700 mt-3 mb-2">
          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
          <span>{jobData.location}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700 mb-4">
          <Globe className="w-4 h-4 mr-2 text-gray-500" />
          <a 
            href={jobData.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Job Posting
          </a>
        </div>

        <a 
          href={jobData.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full bg-purple-600 text-white mt-4 hover:bg-purple-700">
            Apply Now
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default JobCard;
