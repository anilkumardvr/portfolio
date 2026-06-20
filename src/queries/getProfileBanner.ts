import { ProfileBanner } from '../types';
import { anilProfileBanner } from '../data/anilData';

export async function getProfileBanner(): Promise<ProfileBanner> {
  return anilProfileBanner as ProfileBanner;
}
