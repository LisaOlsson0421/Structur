
export type TaskStatus = "Att göra" | "Blockerat" | "Pågående" | "Klart";
export type Stage = 
  "Anbudsstart" | 
  "Projektråd" | 
  "Kalkylarbete" | 
  "Anbudsgenomgång" | 
  "Anbudsråd" | 
  "Anbudsinlämning" | 
  "Anbudsbesked" | 
  "Signerat kontrakt" | 
  "Överlämning";
export type BuildingType = "Bostäder" | "Kommersiellt" | "Samhällsservice" | "Logistik" | "Industri";
export type ContractingType = "Totalentreprenad" | "Utförandeentreprenad" | "Samverkansentreprenad";
export type EnvironmentalCertification = "Miljöbyggnad" | "BREEAM" | "LEED" | "Svanen" | "Ingen";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  stage: Stage;
  assignee?: string;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  status: "pågående" | "avslutat";
  thumbnail: string;
  city: string;
  region: string;
  buildingType: BuildingType;
  contractingType: ContractingType;
  manager: string;
  environmentalCertification: EnvironmentalCertification;
  deadline: string;
}

// Define a ProjectContextType interface with method return types
export interface ProjectContextType {
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
  addProject: (project: Omit<Project, "id">) => string;
  updateProject: (projectId: string, updatedData: Partial<Omit<Project, "id">>) => void;
  deleteProject: (projectId: string) => void;
  addTask: (projectId: string, taskData: { name: string; description: string; stage: Stage; status: TaskStatus }) => void;
  removeTask: (projectId: string, taskId: string) => void;
}
