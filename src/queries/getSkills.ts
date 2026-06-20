import { Skill } from '../types';
import { anilSkills } from '../data/anilData';

export async function getSkills(): Promise<Skill[]> {
  return anilSkills as Skill[];
}
