
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProject } from '@/context/ProjectContext';
import Header from '@/components/Header';
import KanbanBoard from '@/components/KanbanBoard';
import BlogThread from '@/components/BlogThread';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, MapPin, Building, Briefcase, Award, Edit, Image } from 'lucide-react';
import EditProjectForm from '@/components/EditProjectForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById, deleteProject, updateProject } = useProject();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]); // Re-run when projectId changes
  
  // Get project data
  const project = getProjectById(projectId || '');
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl">Projekt hittades inte</p>
      </div>
    );
  }

  const handleDeleteProject = () => {
    deleteProject(project.id);
    navigate('/');
  };

  const handleUpdateProject = (updatedData: any) => {
    updateProject(project.id, updatedData);
    setIsEditDialogOpen(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Format deadline date
  const formattedDeadline = new Date(project.deadline).toLocaleDateString('sv-SE');
  
  // Get status color
  const getStatusColor = (status: string) => {
    return status === 'pågående' ? 'bg-wastbygg-green text-white' : 'bg-wastbygg-slate text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={project.name} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Project header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{project.name}</h1>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 text-wastbygg-slate" />
                  <span>{project.city}, {project.region}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User size={16} className="mr-2 text-wastbygg-slate" />
                  <span>Projektledare: {project.manager}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2 text-wastbygg-slate" />
                  <span>Deadline: {formattedDeadline}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Building size={16} className="mr-2 text-wastbygg-slate" />
                  <span>Typ: {project.buildingType}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase size={16} className="mr-2 text-wastbygg-slate" />
                  <span>Entreprenadform: {project.contractingType}</span>
                </div>
                {project.environmentalCertification !== "Ingen" && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Award size={16} className="mr-2 text-wastbygg-slate" />
                    <span>Miljöcertifiering: {project.environmentalCertification}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="relative">
                {!imageError ? (
                  <img 
                    src={project.thumbnail} 
                    alt={project.name} 
                    className="w-full sm:w-48 h-32 object-cover rounded shadow-sm"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full sm:w-48 h-32 flex items-center justify-center bg-gray-200 rounded shadow-sm">
                    <Image className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 w-full"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Edit size={16} />
                  Redigera projekt
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog/Thread section */}
        {projectId && <BlogThread projectId={projectId} />}
        
        {/* Kanban board section */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Projektaktiviteter - Anbudsprocessen</h2>
          
          {projectId && <KanbanBoard projectId={projectId} />}
        </div>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Redigera projekt</DialogTitle>
          </DialogHeader>
          <EditProjectForm 
            project={project}
            onSave={handleUpdateProject}
            onCancel={() => setIsEditDialogOpen(false)}
            onDelete={handleDeleteProject}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
