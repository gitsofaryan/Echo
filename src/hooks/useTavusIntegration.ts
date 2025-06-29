import { useState, useCallback } from 'react';
import { tavusApi, TavusPersonaRequest, TavusConversationRequest } from '../services/tavusApi';
import toast from 'react-hot-toast';

export function useTavusIntegration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPersona = useCallback(async (personaData: TavusPersonaRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await tavusApi.createPersona(personaData);
      toast.success('Persona created successfully!');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create persona';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createConversation = useCallback(async (conversationData: TavusConversationRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await tavusApi.createConversation(conversationData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create conversation';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendTavusMessage = useCallback(async (conversationId: string, message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await tavusApi.sendMessage(conversationId, message);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getReplicas = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await tavusApi.getReplicas();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch replicas';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setApiKey = useCallback((apiKey: string) => {
    tavusApi.setApiKey(apiKey);
    toast.success('Tavus API key configured!');
  }, []);

  const testConnection = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const isValid = await tavusApi.testApiKey();
      if (isValid) {
        toast.success('Tavus API connection successful!');
        return true;
      } else {
        toast.error('Invalid Tavus API key');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to test connection';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createPersona,
    createConversation,
    sendTavusMessage,
    getReplicas,
    setApiKey,
    testConnection,
    isLoading,
    error,
    isConfigured: tavusApi.isConfigured(),
  };
}