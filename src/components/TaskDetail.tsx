
import { useState } from 'react';
import { Task, TaskStatus } from '@/types/project';
import { useProject } from '@/context/ProjectContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { mockTeamMembers } from '@/data/mockData';
import { Paperclip, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TaskDetailProps {
  task: Task;
  projectId: string;
  onClose: () => void;
  onRemove: () => void;
}

const TaskDetail = ({ task, projectId, onClose, onRemove }: TaskDetailProps) => {
  const { updateTaskStatus, updateTaskAssignee, updateTaskDescription, addAttachment, removeAttachment } = useProject();
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [assignee, setAssignee] = useState<string | undefined>(task.assignee);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [fileInputValue, setFileInputValue] = useState("");

  // Save description changes
  const handleSaveDescription = () => {
    updateTaskDescription(projectId, task.id, description);
    setIsEditingDescription(false);
  };

  // Handle status change
  const handleStatusChange = (newStatus: TaskStatus) => {
    setStatus(newStatus);
    updateTaskStatus(projectId, task.id, newStatus);
  };

  // Handle assignee change
  const handleAssigneeChange = (memberId: string | undefined) => {
    setAssignee(memberId);
    updateTaskAssignee(projectId, task.id, memberId);
  };

  // Handle file attachment (mock implementation)
  const handleAddAttachment = () => {
    if (!fileInputValue.trim()) return;
    
    const newAttachment = {
      id: `att-${Date.now()}`,
      name: fileInputValue,
      url: '#',
      type: 'document'
    };
    
    addAttachment(projectId, task.id, newAttachment);
    setFileInputValue("");
  };

  // Handle delete and close
  const handleDelete = () => {
    onRemove();
    onClose();
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Status selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select value={status} onValueChange={(value: TaskStatus) => handleStatusChange(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Välj status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Att göra">Att göra</SelectItem>
            <SelectItem value="Pågående">Pågående</SelectItem>
            <SelectItem value="Blockerat">Blockerat</SelectItem>
            <SelectItem value="Klart">Klart</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Assignee selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Ansvarig</label>
        <Select value={assignee || "unassigned"} onValueChange={(value) => handleAssigneeChange(value === "unassigned" ? undefined : value)}>
          <SelectTrigger>
            <SelectValue placeholder="Välj ansvarig" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Ingen tilldelad</SelectItem>
            {mockTeamMembers.map(member => (
              <SelectItem key={member.id} value={member.id}>
                {member.name} - {member.role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Beskrivning</label>
          {!isEditingDescription && (
            <Button variant="outline" size="sm" onClick={() => setIsEditingDescription(true)}>
              Redigera
            </Button>
          )}
        </div>
        
        {isEditingDescription ? (
          <div className="space-y-2">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Ange beskrivning av uppgiften"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditingDescription(false)}>
                Avbryt
              </Button>
              <Button size="sm" onClick={handleSaveDescription}>
                Spara
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
            {description || "Ingen beskrivning tillagd."}
          </p>
        )}
      </div>
      
      {/* Attachments */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Bilagor</label>
        
        {/* List of attachments */}
        {task.attachments.length > 0 ? (
          <ul className="space-y-2">
            {task.attachments.map(attachment => (
              <li key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <Paperclip size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm">{attachment.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeAttachment(projectId, task.id, attachment.id)}
                >
                  <X size={16} />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Inga bilagor.</p>
        )}
        
        {/* Add attachment (mock) */}
        <div className="flex gap-2">
          <Input
            placeholder="Filnamn"
            value={fileInputValue}
            onChange={(e) => setFileInputValue(e.target.value)}
          />
          <Button variant="outline" size="sm" onClick={handleAddAttachment}>
            <Paperclip size={16} className="mr-2" />
            Lägg till
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 size={16} className="mr-2" />
          Ta bort
        </Button>
        <Button variant="default" onClick={onClose}>
          Stäng
        </Button>
      </div>
    </div>
  );
};

export default TaskDetail;
