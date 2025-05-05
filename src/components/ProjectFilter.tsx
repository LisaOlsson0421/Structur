
import { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BuildingType, ContractingType, EnvironmentalCertification } from '@/types/project';

interface ProjectFilterProps {
  onStatusChange: (status: string | null) => void;
  currentStatus: string | null;
}

const ProjectFilter = ({ onStatusChange, currentStatus }: ProjectFilterProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Status:</span>
        <div className="flex gap-2">
          <Button 
            variant={currentStatus === null ? "default" : "outline"} 
            size="sm"
            onClick={() => onStatusChange(null)}
            className="text-sm"
          >
            Alla
          </Button>
          <Button 
            variant={currentStatus === "pågående" ? "default" : "outline"} 
            size="sm"
            onClick={() => onStatusChange("pågående")}
            className="text-sm"
          >
            Pågående
          </Button>
          <Button 
            variant={currentStatus === "avslutat" ? "default" : "outline"} 
            size="sm"
            onClick={() => onStatusChange("avslutat")}
            className="text-sm"
          >
            Avslutade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
