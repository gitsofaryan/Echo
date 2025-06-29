import { useQuery } from '@tanstack/react-query';
import { mockPersonas } from '../data/mockData';

export function usePersonas() {
  return useQuery({
    queryKey: ['personas'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockPersonas;
    },
  });
}