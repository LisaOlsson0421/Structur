
import { useState } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilter from '@/components/ProjectFilter';
import NewProjectDialog from '@/components/NewProjectDialog';
import { useProject } from '@/context/ProjectContext';

const ProjectOverview = () => {
  const { filterProjects } = useProject();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get filtered projects
  const filteredProjects = filterProjects(statusFilter, searchTerm);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Structur Projekthantering"
        showSearch={true}
        searchPlaceholder="Sök projekt..."
        onSearchChange={setSearchTerm}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projekt</h1>
            <p className="text-gray-600">Hantera och övervaka pågående och avslutade byggprojekt</p>
          </div>
          <NewProjectDialog />
        </div>
        
        <ProjectFilter 
          onStatusChange={setStatusFilter}
          currentStatus={statusFilter}
        />
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Inga projekt hittades</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectOverview;
