import { useQuery } from '@tanstack/react-query';
import { mockPersonas } from '../data/mockData';

export function usePersona(id: string) {
  return useQuery({
    queryKey: ['persona', id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPersonas.find(p => p.id === id);
    },
  });
}