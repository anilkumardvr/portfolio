import { Project } from '../types';
import { anilProjects } from '../data/anilData';

export async function getProjects(): Promise<Project[]> {
  return anilProjects as Project[];
}
