import { TimelineItem } from '../types';
import { anilTimeline } from '../data/anilData';

export async function getTimeline(): Promise<TimelineItem[]> {
  return anilTimeline as TimelineItem[];
}
