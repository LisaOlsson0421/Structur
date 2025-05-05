
import { Project, Task, Attachment, Stage, TaskStatus } from '../types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Norra Djurgårdsstaden',
    status: 'pågående',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1664&auto=format&fit=crop',
    city: 'Stockholm',
    region: 'Stockholm',
    buildingType: 'Bostäder',
    contractingType: 'Totalentreprenad',
    manager: 'Anna Lundberg',
    environmentalCertification: 'Miljöbyggnad',
    deadline: '2024-12-31'
  },
  {
    id: '2',
    name: 'Logistik Arlanda',
    status: 'pågående',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop',
    city: 'Sigtuna',
    region: 'Stockholm',
    buildingType: 'Logistik',
    contractingType: 'Samverkansentreprenad',
    manager: 'Erik Johansson',
    environmentalCertification: 'BREEAM',
    deadline: '2025-06-30'
  },
  {
    id: '3',
    name: 'Göteborgs Sjukhus',
    status: 'pågående',
    thumbnail: 'https://images.unsplash.com/photo-1629195636404-56f0555dc301?q=80&w=1664&auto=format&fit=crop',
    city: 'Göteborg',
    region: 'Västra Götaland',
    buildingType: 'Samhällsservice',
    contractingType: 'Utförandeentreprenad',
    manager: 'Maria Bergström',
    environmentalCertification: 'LEED',
    deadline: '2026-01-15'
  },
  {
    id: '4',
    name: 'Kontorskomplex Malmö',
    status: 'avslutat',
    thumbnail: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1469&auto=format&fit=crop',
    city: 'Malmö',
    region: 'Skåne',
    buildingType: 'Kommersiellt',
    contractingType: 'Totalentreprenad',
    manager: 'Johan Nilsson',
    environmentalCertification: 'Svanen',
    deadline: '2023-08-30'
  },
  {
    id: '5',
    name: 'Industri Östersund',
    status: 'avslutat',
    thumbnail: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=1470&auto=format&fit=crop',
    city: 'Östersund',
    region: 'Jämtland',
    buildingType: 'Industri',
    contractingType: 'Samverkansentreprenad',
    manager: 'Lisa Andersson',
    environmentalCertification: 'Ingen',
    deadline: '2023-11-15'
  }
];

// Task structure factory
function createTasksForStage(stage: Stage, status: TaskStatus = "Att göra"): Task[] {
  let tasks: Task[] = [];
  
  switch(stage) {
    case "Anbudsstart":
      tasks = [
        { id: `${stage}-1`, name: "Anbudsstartmöte", description: "Håll kickoff-möte för anbudsarbetet", status, stage, attachments: [] },
        { id: `${stage}-2`, name: "Förbered presentation projektråd", description: "Skapa presentation för projektrådet", status, stage, attachments: [] },
        { id: `${stage}-3`, name: "Avstämningsmöte", description: "Avstämningsmöte med projektgruppen", status, stage, attachments: [] },
        { id: `${stage}-4`, name: "Uppföljningsmöte 1", description: "Första uppföljningsmötet", status, stage, attachments: [] },
        { id: `${stage}-5`, name: "Uppföljningsmöte 2", description: "Andra uppföljningsmötet", status, stage, attachments: [] },
        { id: `${stage}-6`, name: "Strategi för att vinna anbudet", description: "Utveckla en strategi för att vinna anbudet", status, stage, attachments: [] },
        { id: `${stage}-7`, name: "Slutmöte anbud", description: "Avslutande möte för anbudsfasen", status, stage, attachments: [] },
      ];
      break;
    case "Projektråd":
      tasks = [
        { id: `${stage}-1`, name: "Presentation av anbudet", description: "Presentera anbudet för projektrådet", status, stage, attachments: [] },
      ];
      break;
    case "Kalkylarbete":
      tasks = [
        { id: `${stage}-1`, name: "Förberedelser", description: "Förbered underlag för kalkylarbete", status, stage, attachments: [] },
        { id: `${stage}-2`, name: "Förfrågningar", description: "Skicka förfrågningar till underleverantörer", status, stage, attachments: [] },
        { id: `${stage}-3`, name: "Kalkylering", description: "Genomför kalkylering av projektet", status, stage, attachments: [] },
        { id: `${stage}-4`, name: "Kalkylsammanställning", description: "Sammanställ kalkylresultaten", status, stage, attachments: [] },
      ];
      break;
    case "Anbudsgenomgång":
      tasks = [
        { id: `${stage}-1`, name: "Förberedelser", description: "Förbered anbudsgenomgång", status, stage, attachments: [] },
        { id: `${stage}-2`, name: "Förberedelser över 400MSEK", description: "Särskilda förberedelser för stora projekt", status, stage, attachments: [] },
        { id: `${stage}-3`, name: "Anbudssammanställning", description: "Sammanställ anbudet", status, stage, attachments: [] },
        { id: `${stage}-4`, name: "Försäkringar och säkerhet", description: "Säkerställ försäkringar och säkerheter", status, stage, attachments: [] },
      ];
      break;
    case "Anbudsråd":
      tasks = [
        { id: `${stage}-1`, name: "Anbudsråd", description: "Möte med anbudsrådet", status, stage, attachments: [] },
      ];
      break;
    case "Anbudsinlämning":
      tasks = [
        { id: `${stage}-1`, name: "Lämna anbud enligt AF", description: "Lämna in anbudet enligt administrativa föreskrifter", status, stage, attachments: [] },
        { id: `${stage}-2`, name: "Anbudskompletteringar (AK)", description: "Hantera eventuella kompletteringar till anbudet", status, stage, attachments: [] },
      ];
      break;
    case "Anbudsbesked":
      tasks = [
        { id: `${stage}-1`, name: "Inför kontraktskrivning", description: "Förbered för kontraktskrivning", status, stage, attachments: [] },
        { id: `${stage}-2`, name: "Kontraktsgenomgång", description: "Genomgång av kontraktet", status, stage, attachments: [] },
      ];
      break;
    case "Signerat kontrakt":
      tasks = [
        { id: `${stage}-1`, name: "Signerat kontrakt", description: "Bekräfta signerat kontrakt", status, stage, attachments: [] },
        { id: `${stage}-2`, name: "Säkerställ kommunikation till marknaden", description: "Kommunicera med relevanta marknadsaktörer", status, stage, attachments: [] },
        { id: `${stage}-3`, name: "Arkivera signerat kontrakt", description: "Arkivera det signerade kontraktet", status, stage, attachments: [] },
      ];
      break;
    case "Överlämning":
      tasks = [
        { id: `${stage}-1`, name: "Projektanmälan", description: "Anmäl projektet enligt rutiner", status, stage, attachments: [] },
        { id: `${stage}-2`, name: "Uppdatera anbudskalkyl till kontraktskalkyl", description: "Uppdatera kalkylen efter kontraktsskrivning", status, stage, attachments: [] },
        { id: `${stage}-3`, name: "Förberedelser inför projektstartmöte", description: "Förbered för projektstartmöte", status, stage, attachments: [] },
      ];
      break;
  }
  
  return tasks;
}

// Create mock tasks for project 1
export const mockTasks: { [projectId: string]: Task[] } = {
  '1': [
    ...createTasksForStage("Anbudsstart"),
    ...createTasksForStage("Projektråd"),
    ...createTasksForStage("Kalkylarbete"),
    ...createTasksForStage("Anbudsgenomgång"),
    ...createTasksForStage("Anbudsråd"),
    ...createTasksForStage("Anbudsinlämning"),
    ...createTasksForStage("Anbudsbesked"),
    ...createTasksForStage("Signerat kontrakt"),
    ...createTasksForStage("Överlämning")
  ],
  '2': [
    ...createTasksForStage("Anbudsstart"),
    ...createTasksForStage("Projektråd"),
    ...createTasksForStage("Kalkylarbete"),
    ...createTasksForStage("Anbudsgenomgång"),
    ...createTasksForStage("Anbudsråd", "Pågående"),
    ...createTasksForStage("Anbudsinlämning"),
    ...createTasksForStage("Anbudsbesked"),
    ...createTasksForStage("Signerat kontrakt"),
    ...createTasksForStage("Överlämning")
  ],
  '3': [
    ...createTasksForStage("Anbudsstart", "Klart"),
    ...createTasksForStage("Projektråd", "Klart"),
    ...createTasksForStage("Kalkylarbete", "Pågående"),
    ...createTasksForStage("Anbudsgenomgång"),
    ...createTasksForStage("Anbudsråd"),
    ...createTasksForStage("Anbudsinlämning"),
    ...createTasksForStage("Anbudsbesked"),
    ...createTasksForStage("Signerat kontrakt"),
    ...createTasksForStage("Överlämning")
  ],
  '4': [
    ...createTasksForStage("Anbudsstart", "Klart"),
    ...createTasksForStage("Projektråd", "Klart"),
    ...createTasksForStage("Kalkylarbete", "Klart"),
    ...createTasksForStage("Anbudsgenomgång", "Klart"),
    ...createTasksForStage("Anbudsråd", "Klart"),
    ...createTasksForStage("Anbudsinlämning", "Klart"),
    ...createTasksForStage("Anbudsbesked", "Klart"),
    ...createTasksForStage("Signerat kontrakt", "Klart"),
    ...createTasksForStage("Överlämning", "Klart")
  ],
  '5': [
    ...createTasksForStage("Anbudsstart", "Klart"),
    ...createTasksForStage("Projektråd", "Klart"),
    ...createTasksForStage("Kalkylarbete", "Klart"),
    ...createTasksForStage("Anbudsgenomgång", "Klart"),
    ...createTasksForStage("Anbudsråd", "Klart"),
    ...createTasksForStage("Anbudsinlämning", "Klart"),
    ...createTasksForStage("Anbudsbesked", "Klart"),
    ...createTasksForStage("Signerat kontrakt", "Klart"),
    ...createTasksForStage("Överlämning", "Klart")
  ]
};

export const mockTeamMembers = [
  { id: '1', name: 'Anna Lundberg', role: 'Project Manager', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Erik Johansson', role: 'Site Manager', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Maria Bergström', role: 'Project Engineer', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '4', name: 'Johan Nilsson', role: 'Construction Manager', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: '5', name: 'Lisa Andersson', role: 'Financial Analyst', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' }
];
