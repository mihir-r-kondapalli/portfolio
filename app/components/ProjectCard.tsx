import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, link }) => {
  return (
    <div className="project-card">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline"
        >
          View Project →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;