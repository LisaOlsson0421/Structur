
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Map, Image } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const getStatusColor = (status: string) => {
    return status === 'pågående' ? 'bg-wastbygg-green text-white' : 'bg-wastbygg-slate text-white';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md h-full">
        <div className="relative h-40 overflow-hidden bg-gray-100">
          {!imageError ? (
            <img 
              src={project.thumbnail} 
              alt={project.name} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <Image className="h-16 w-16 text-gray-400" />
            </div>
          )}
          <Badge className={`absolute top-3 right-3 ${getStatusColor(project.status)}`}>
            {project.status}
          </Badge>
        </div>
        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Map size={16} className="mr-2 text-wastbygg-slate" />
              <span>{project.city}, {project.region}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2 text-wastbygg-slate" />
              <span>{project.manager}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-wastbygg-slate" />
              <span>Deadline: {new Date(project.deadline).toLocaleDateString('sv-SE')}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 text-xs">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-gray-50">{project.buildingType}</Badge>
            <Badge variant="outline" className="bg-gray-50">{project.contractingType}</Badge>
            {project.environmentalCertification !== "Ingen" && (
              <Badge variant="outline" className="bg-gray-50">{project.environmentalCertification}</Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
