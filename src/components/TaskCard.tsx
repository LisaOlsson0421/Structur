
import { Task } from '@/types/project';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import TaskDetail from './TaskDetail';
import { mockTeamMembers } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Paperclip, User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  projectId: string;
  index: number;
  onRemove: () => void;
}

const TaskCard = ({ task, projectId, index, onRemove }: TaskCardProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Function to determine status indicator class
  const getStatusIndicatorClass = (status: string) => {
    if (status === "Blockerat") return "before:bg-wastbygg-red";
    if (status === "Pågående") return "before:bg-wastbygg-amber";
    if (status === "Klart") return "before:bg-wastbygg-green";
    return "before:bg-transparent";
  };

  // Find assignee name if assigned
  const getAssigneeInfo = () => {
    if (!task.assignee) return null;
    
    const assignee = mockTeamMembers.find(member => member.id === task.assignee);
    if (!assignee) return null;
    
    return {
      name: assignee.name,
      initials: assignee.name.split(' ').map(n => n[0]).join(''),
    };
  };

  const assigneeInfo = getAssigneeInfo();
  const hasAttachments = task.attachments && task.attachments.length > 0;

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`task-card mb-2 ${snapshot.isDragging ? 'dragging' : ''}`}
            onClick={() => setIsDetailOpen(true)}
          >
            <Card 
              className={`shadow-sm hover:shadow-md transition-shadow cursor-pointer relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-l-lg ${getStatusIndicatorClass(task.status)}`}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <h5 className="font-medium text-sm">{task.name}</h5>
                </div>
                {task.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                )}
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-100">
                  {assigneeInfo ? (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Avatar className="h-5 w-5 text-xs">
                        <AvatarFallback className="bg-wastbygg-slate text-white text-xs">
                          {assigneeInfo.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[120px]">{assigneeInfo.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <User size={12} />
                      <span>Ingen tilldelad</span>
                    </div>
                  )}
                  {hasAttachments && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Paperclip size={12} />
                      <span className="ml-1">{task.attachments.length}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{task.name}</DialogTitle>
          </DialogHeader>
          <TaskDetail 
            task={task} 
            projectId={projectId} 
            onClose={() => setIsDetailOpen(false)}
            onRemove={onRemove} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskCard;
