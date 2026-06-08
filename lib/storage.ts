export interface StoredProject {
  id: string;
  name: string;
  thumbnail: string; // SVG data URI
  createdAt: string;
  updatedAt: string;
  code: string; // latest generated code
  versions: StoredVersion[];
}

export interface StoredVersion {
  id: string;
  code: string;
  stylePrompt: string;
  timestamp: string;
  label: string; // auto-generated like 'v1', 'v2', etc.
}

export interface StoredShare {
  slug: string;
  code: string;
  projectName: string;
  createdAt: string;
}

const PROJECTS_KEY = "wta_projects";
const SHARES_KEY = "wta_shares";

// Helper to generate IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getMockSketchThumbnail(): string {
  return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231f1f23'/><line x1='10' y1='10' x2='90' y2='90' stroke='%238b5cf6' stroke-width='2'/><line x1='90' y1='10' x2='10' y2='90' stroke='%238b5cf6' stroke-width='2'/><circle cx='50' cy='50' r='10' fill='%23a78bfa'/></svg>";
}

// ----------------- Projects -----------------

export function getProjects(): StoredProject[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (!data) return [];
    return JSON.parse(data) as StoredProject[];
  } catch (e) {
    console.error("Error reading projects:", e);
    return [];
  }
}

export function getProject(id: string): StoredProject | null {
  const projects = getProjects();
  return projects.find((p) => p.id === id) || null;
}

export function createProject(name: string): StoredProject {
  const projects = getProjects();
  const newProject: StoredProject = {
    id: generateId(),
    name: name || "Untitled Project",
    thumbnail: getMockSketchThumbnail(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    code: "",
    versions: [],
  };
  projects.push(newProject);
  if (typeof window !== "undefined") {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }
  return newProject;
}

export function updateProject(id: string, data: Partial<StoredProject>): StoredProject | null {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProject = {
    ...projects[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  projects[index] = updatedProject;
  if (typeof window !== "undefined") {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }
  return updatedProject;
}

export function deleteProject(id: string): void {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
  }
}

// ----------------- Versions -----------------

export function addVersion(projectId: string, code: string, stylePrompt: string): StoredVersion | null {
  const project = getProject(projectId);
  if (!project) return null;

  const newVersion: StoredVersion = {
    id: generateId(),
    code,
    stylePrompt,
    timestamp: new Date().toISOString(),
    label: `v${project.versions.length + 1}`,
  };

  const updatedVersions = [...project.versions, newVersion];
  
  updateProject(projectId, { 
    versions: updatedVersions,
    code: code // also update the latest code
  });

  return newVersion;
}

export function getVersions(projectId: string): StoredVersion[] {
  const project = getProject(projectId);
  return project ? project.versions : [];
}

// ----------------- Shares -----------------

function getShares(): StoredShare[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(SHARES_KEY);
    if (!data) return [];
    return JSON.parse(data) as StoredShare[];
  } catch (e) {
    console.error("Error reading shares:", e);
    return [];
  }
}

export function createShare(code: string, projectName: string): StoredShare {
  const shares = getShares();
  const newShare: StoredShare = {
    slug: generateId(),
    code,
    projectName: projectName || "WireframeToApp Share",
    createdAt: new Date().toISOString(),
  };
  
  shares.push(newShare);
  if (typeof window !== "undefined") {
    localStorage.setItem(SHARES_KEY, JSON.stringify(shares));
  }
  return newShare;
}

export function getShare(slug: string): StoredShare | null {
  const shares = getShares();
  return shares.find((s) => s.slug === slug) || null;
}
