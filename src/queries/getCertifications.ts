import { anilCertifications } from '../data/anilData';
import { Certification } from '../types';

export async function getCertifications(): Promise<Certification[]> {
    return anilCertifications as Certification[];
}
