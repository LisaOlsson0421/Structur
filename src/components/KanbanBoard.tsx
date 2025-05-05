
import { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Task, TaskStatus, Stage } from '@/types/project';
import TaskCard from './TaskCard';
import AddTaskDialog from './AddTaskDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useToast } from '@/hooks/use-toast';

interface KanbanBoardProps {
  projectId: string;
}

const KanbanBoard = ({ projectId }: KanbanBoardProps) => {
  const { getTasksForProject, moveTask, removeTask } = useProject();
  const { toast } = useToast();
  const projectTasks = getTasksForProject(projectId);
  const [addTaskDialogState, setAddTaskDialogState] = useState<{
    isOpen: boolean;
    stage: Stage | null;
    status: TaskStatus | null;
  }>({
    isOpen: false,
    stage: null,
    status: null,
  });
  
  // Get unique stages in the correct order
  const stages: Stage[] = [
    "Anbudsstart",
    "Projektråd",
    "Kalkylarbete",
    "Anbudsgenomgång",
    "Anbudsråd",
    "Anbudsinlämning",
    "Anbudsbesked",
    "Signerat kontrakt",
    "Överlämning"
  ];
  
  // Define the status columns
  const statusColumns: TaskStatus[] = ["Att göra", "Blockerat", "Pågående", "Klart"];
  
  // Group tasks by stage
  const tasksByStage: Record<Stage, Task[]> = stages.reduce((acc, stage) => {
    acc[stage] = projectTasks.filter(task => task.stage === stage);
    return acc;
  }, {} as Record<Stage, Task[]>);

  // Handle drag end event
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination or the item was dropped back into its original position
    if (!destination) {
      return;
    }
    
    // If the destination is the same as the source (same column), no need to update
    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) {
      return;
    }
    
    // Extract the task ID and source/destination statuses from the droppable IDs
    const [, destinationStatus] = destination.droppableId.split('-');
    
    // Move the task
    moveTask(
      projectId, 
      draggableId, 
      source.droppableId.split('-')[1] as TaskStatus, 
      destinationStatus as TaskStatus
    );
    
    toast({
      title: "Uppgift flyttad",
      description: `Uppgiften har flyttats till ${destinationStatus}`,
    });
  };

  const openAddTaskDialog = (stage: Stage, status: TaskStatus) => {
    setAddTaskDialogState({
      isOpen: true,
      stage,
      status,
    });
  };

  const closeAddTaskDialog = () => {
    setAddTaskDialogState({
      isOpen: false,
      stage: null,
      status: null,
    });
  };

  const handleRemoveTask = (taskId: string) => {
    removeTask(projectId, taskId);
    toast({
      title: "Uppgift borttagen",
      description: "Uppgiften har tagits bort",
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="space-y-10 pb-16">
          {stages.map(stage => (
            <div key={stage} className="kanban-stage">
              <h3 className="text-xl font-semibold mb-4">{stage}</h3>
              <div className="flex gap-4 kanban-board">
                {statusColumns.map(status => (
                  <Droppable 
                    key={`${stage}-${status}`} 
                    droppableId={`${stage}-${status}`}
                  >
                    {(provided: DroppableProvided) => (
                      <div 
                        className="kanban-column bg-gray-50 rounded-md p-3 min-w-[250px] min-h-[200px] flex-1 flex flex-col"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-sm font-medium text-gray-700">{status}</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => openAddTaskDialog(stage, status)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2 flex-1">
                          {tasksByStage[stage]
                            .filter(task => task.status === status)
                            .map((task, index) => (
                              <TaskCard 
                                key={task.id} 
                                task={task} 
                                projectId={projectId} 
                                index={index}
                                onRemove={() => handleRemoveTask(task.id)}
                              />
                            ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
      
      {addTaskDialogState.isOpen && addTaskDialogState.stage && addTaskDialogState.status && (
        <AddTaskDialog 
          isOpen={addTaskDialogState.isOpen}
          onClose={closeAddTaskDialog}
          projectId={projectId}
          stage={addTaskDialogState.stage}
          status={addTaskDialogState.status}
        />
      )}
    </>
  );
};

export default KanbanBoard;
