import { anilCertifications } from '../data/anilData';

export async function getCertifications(): Promise<any[]> {
  return anilCertifications.map((title) => ({ title, description: title, issuer: title }));
}
