import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Project, Task, Attachment, TaskStatus, Stage } from '../types/project';
import { mockProjects, mockTasks } from '../data/mockData';
import { useToast } from "@/hooks/use-toast";

interface ProjectContextType {
  projects: Project[];
  tasks: { [projectId: string]: Task[] };
  getProjectById: (id: string) => Project | undefined;
  getTasksForProject: (projectId: string) => Task[];
  updateTaskStatus: (projectId: string, taskId: string, newStatus: TaskStatus) => void;
  updateTaskAssignee: (projectId: string, taskId: string, assigneeId: string | undefined) => void;
  updateTaskDescription: (projectId: string, taskId: string, description: string) => void;
  addAttachment: (projectId: string, taskId: string, attachment: Attachment) => void;
  removeAttachment: (projectId: string, taskId: string, attachmentId: string) => void;
  filterProjects: (status: string | null, search: string) => Project[];
  moveTask: (projectId: string, taskId: string, sourceStatus: TaskStatus, destinationStatus: TaskStatus) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (projectId: string, updatedData: Partial<Omit<Project, "id">>) => void;
  deleteProject: (projectId: string) => void;
  addTask: (projectId: string, taskData: { name: string; description: string; stage: Stage; status: TaskStatus }) => void;
  removeTask: (projectId: string, taskId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const PROJECTS_STORAGE_KEY = 'wastbygg-projects';
const TASKS_STORAGE_KEY = 'wastbygg-tasks';

const getDefaultTasks = (projectId: string): Task[] => {
  const stages: string[] = [
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

  let allTasks: Task[] = [];
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Anbudsstartmöte",
      description: "Håll kickoff-möte för anbudsarbetet",
      status: "Att göra",
      stage: "Anbudsstart",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Förbered presentation projektråd",
      description: "Skapa presentation för projektrådet",
      status: "Att göra",
      stage: "Anbudsstart",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Avstämningsmöte",
      description: "Avstämningsmöte med projektgruppen",
      status: "Att göra",
      stage: "Anbudsstart",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Uppföljningsmöte 1",
      description: "Första uppföljningsmötet",
      status: "Att göra",
      stage: "Anbudsstart",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Uppföljningsmöte 2",
      description: "Andra uppföljningsmötet",
      status: "Att göra",
      stage: "Anbudsstart",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Strategi för att vinna anbudet",
      description: "Utveckla en strategi för att vinna anbudet",
      status: "Att göra",
      stage: "Anbudsstart",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Slutmöte anbud",
      description: "Avslutande möte för anbudsfasen",
      status: "Att göra",
      stage: "Anbudsstart",
      attachments: []
    }
  ]);
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Presentation av anbudet",
      description: "Presentera anbudet för projektrådet",
      status: "Att göra",
      stage: "Projektråd",
      attachments: []
    }
  ]);
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Förberedelser",
      description: "Förbered underlag för kalkylarbete",
      status: "Att göra",
      stage: "Kalkylarbete",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Förfrågningar",
      description: "Skicka förfrågningar till underleverantörer",
      status: "Att göra",
      stage: "Kalkylarbete",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Kalkylering",
      description: "Genomför kalkylering av projektet",
      status: "Att göra",
      stage: "Kalkylarbete",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Kalkylsammanställning",
      description: "Sammanställ kalkylresultaten",
      status: "Att göra",
      stage: "Kalkylarbete",
      attachments: []
    }
  ]);
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Förberedelser",
      description: "Förbered anbudsgenomgång",
      status: "Att göra",
      stage: "Anbudsgenomgång",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Förberedelser över 400MSEK",
      description: "Särskilda förberedelser för stora projekt",
      status: "Att göra",
      stage: "Anbudsgenomgång",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Anbudssammanställning",
      description: "Sammanställ anbudet",
      status: "Att göra",
      stage: "Anbudsgenomgång",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Försäkringar och säkerhet",
      description: "Säkerställ försäkringar och säkerheter",
      status: "Att göra",
      stage: "Anbudsgenomgång",
      attachments: []
    }
  ]);
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Anbudsråd",
      description: "Möte med anbudsrådet",
      status: "Att göra",
      stage: "Anbudsråd",
      attachments: []
    }
  ]);
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Lämna anbud enligt AF",
      description: "Lämna in anbudet enligt administrativa föreskrifter",
      status: "Att göra",
      stage: "Anbudsinlämning",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Anbudskompletteringar (AK)",
      description: "Hantera eventuella kompletteringar till anbudet",
      status: "Att göra",
      stage: "Anbudsinlämning",
      attachments: []
    }
  ]);
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Inför kontraktskrivning",
      description: "Förbered för kontraktskrivning",
      status: "Att göra",
      stage: "Anbudsbesked",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Kontraktsgenomgång",
      description: "Genomgång av kontraktet",
      status: "Att göra",
      stage: "Anbudsbesked",
      attachments: []
    }
  ]);
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Signerat kontrakt",
      description: "Bekräfta signerat kontrakt",
      status: "Att göra",
      stage: "Signerat kontrakt",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Säkerställ kommunikation till marknaden",
      description: "Kommunicera med relevanta marknadsaktörer",
      status: "Att göra",
      stage: "Signerat kontrakt",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Arkivera signerat kontrakt",
      description: "Arkivera det signerade kontraktet",
      status: "Att göra",
      stage: "Signerat kontrakt",
      attachments: []
    }
  ]);
  
  allTasks = allTasks.concat([
    {
      id: crypto.randomUUID(),
      name: "Projektanmälan",
      description: "Anmäl projektet enligt rutiner",
      status: "Att göra",
      stage: "Överlämning",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Uppdatera anbudskalkyl till kontraktskalkyl",
      description: "Uppdatera kalkylen efter kontraktsskrivning",
      status: "Att göra",
      stage: "Överlämning",
      attachments: []
    },
    {
      id: crypto.randomUUID(),
      name: "Förberedelser inför projektstartmöte",
      description: "Förbered för projektstartmöte",
      status: "Att göra",
      stage: "Överlämning",
      attachments: []
    }
  ]);
  
  return allTasks;
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return savedProjects ? JSON.parse(savedProjects) : mockProjects;
  });
  
  const [tasks, setTasks] = useState<{ [projectId: string]: Task[] }>(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : mockTasks;
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  const getTasksForProject = (projectId: string): Task[] => {
    return tasks[projectId] || [];
  };

  const updateTaskStatus = (projectId: string, taskId: string, newStatus: TaskStatus) => {
    setTasks(prevTasks => {
      const projectTasks = [...(prevTasks[projectId] || [])];
      const taskIndex = projectTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        projectTasks[taskIndex] = {
          ...projectTasks[taskIndex],
          status: newStatus
        };
      }
      
      return {
        ...prevTasks,
        [projectId]: projectTasks
      };
    });
    
    toast({
      title: "Status uppdaterad",
      description: `Uppgiftsstatus har ändrats till ${newStatus}`,
    });
  };

  const moveTask = (projectId: string, taskId: string, sourceStatus: TaskStatus, destinationStatus: TaskStatus) => {
    if (sourceStatus === destinationStatus) return;
    
    updateTaskStatus(projectId, taskId, destinationStatus);
  };

  const updateTaskAssignee = (projectId: string, taskId: string, assigneeId: string | undefined) => {
    setTasks(prevTasks => {
      const projectTasks = [...(prevTasks[projectId] || [])];
      const taskIndex = projectTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        projectTasks[taskIndex] = {
          ...projectTasks[taskIndex],
          assignee: assigneeId
        };
      }
      
      return {
        ...prevTasks,
        [projectId]: projectTasks
      };
    });
    
    toast({
      title: "Ansvarig uppdaterad",
      description: "Uppgiftens ansvariga person har uppdaterats",
    });
  };

  const updateTaskDescription = (projectId: string, taskId: string, description: string) => {
    setTasks(prevTasks => {
      const projectTasks = [...(prevTasks[projectId] || [])];
      const taskIndex = projectTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        projectTasks[taskIndex] = {
          ...projectTasks[taskIndex],
          description
        };
      }
      
      return {
        ...prevTasks,
        [projectId]: projectTasks
      };
    });
    
    toast({
      title: "Beskrivning uppdaterad",
      description: "Uppgiftsbeskrivningen har uppdaterats",
    });
  };

  const addAttachment = (projectId: string, taskId: string, attachment: Attachment) => {
    setTasks(prevTasks => {
      const projectTasks = [...(prevTasks[projectId] || [])];
      const taskIndex = projectTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        projectTasks[taskIndex] = {
          ...projectTasks[taskIndex],
          attachments: [...projectTasks[taskIndex].attachments, attachment]
        };
      }
      
      return {
        ...prevTasks,
        [projectId]: projectTasks
      };
    });
    
    toast({
      title: "Bilaga tillagd",
      description: `${attachment.name} har lagts till`
    });
  };

  const removeAttachment = (projectId: string, taskId: string, attachmentId: string) => {
    setTasks(prevTasks => {
      const projectTasks = [...(prevTasks[projectId] || [])];
      const taskIndex = projectTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        projectTasks[taskIndex] = {
          ...projectTasks[taskIndex],
          attachments: projectTasks[taskIndex].attachments.filter(att => att.id !== attachmentId)
        };
      }
      
      return {
        ...prevTasks,
        [projectId]: projectTasks
      };
    });
    
    toast({
      title: "Bilaga borttagen",
      description: "Bilagan har tagits bort"
    });
  };

  const filterProjects = (status: string | null, search: string): Project[] => {
    return projects.filter(project => {
      if (status && project.status !== status) {
        return false;
      }
      
      if (search && !project.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID()
    };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    
    setTasks(prevTasks => ({
      ...prevTasks,
      [newProject.id]: getDefaultTasks(newProject.id)
    }));
    
    toast({
      title: "Projekt tillagt",
      description: `${newProject.name} har lagts till`
    });
    
    return newProject.id;
  };

  const updateProject = (projectId: string, updatedData: Partial<Omit<Project, "id">>) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, ...updatedData } 
          : project
      )
    );
    
    toast({
      title: "Projekt uppdaterat",
      description: "Projektinformationen har uppdaterats",
    });
  };

  const deleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      delete newTasks[projectId];
      return newTasks;
    });
    
    toast({
      title: "Projekt borttaget",
      description: "Projektet har tagits bort"
    });
  };

  const addTask = (
    projectId: string, 
    taskData: { name: string; description: string; stage: Stage; status: TaskStatus }
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: taskData.name,
      description: taskData.description,
      stage: taskData.stage,
      status: taskData.status,
      attachments: []
    };
    
    setTasks(prevTasks => ({
      ...prevTasks,
      [projectId]: [...(prevTasks[projectId] || []), newTask]
    }));
    
    toast({
      title: "Uppgift tillagd",
      description: `${newTask.name} har lagts till`
    });
  };

  const removeTask = (projectId: string, taskId: string) => {
    setTasks(prevTasks => {
      const projectTasks = [...(prevTasks[projectId] || [])];
      return {
        ...prevTasks,
        [projectId]: projectTasks.filter(task => task.id !== taskId)
      };
    });
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      tasks,
      getProjectById,
      getTasksForProject,
      updateTaskStatus,
      updateTaskAssignee,
      updateTaskDescription,
      addAttachment,
      removeAttachment,
      filterProjects,
      moveTask,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      removeTask
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
