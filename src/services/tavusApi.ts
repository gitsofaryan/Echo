// Tavus API Integration Service
// This service handles all interactions with the Tavus API for creating and managing AI personas

interface TavusPersonaRequest {
  persona_name: string;
  default_replica_id: string;
  system_prompt: string;
  context: string;
  layers?: {
    perception?: {
      perception_model: string;
      ambient_awareness_queries: string[];
    };
  };
}

interface TavusConversationRequest {
  replica_id: string;
  conversation_name: string;
  persona_id?: string;
  callback_url?: string;
}

interface TavusPersonaResponse {
  persona_id: string;
  persona_name: string;
  status: string;
  created_at: string;
}

interface TavusConversationResponse {
  conversation_id: string;
  conversation_url: string;
  status: string;
  created_at: string;
}

interface TavusReplica {
  replica_id: string;
  replica_name: string;
  status: string;
  created_at: string;
  thumbnail_url?: string;
}

class TavusApiService {
  private baseUrl = 'https://tavusapi.com/v2';
  private apiKey: string;

  constructor() {
    // Use the provided API key as default
    this.apiKey = 'c0d9482ab5af4934bc1ee332653263fc';
    
    // Also check localStorage for user customization
    if (typeof window !== 'undefined') {
      const storedKey = localStorage.getItem('tavus-api-key');
      if (storedKey && storedKey.trim()) {
        this.apiKey = storedKey;
      }
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    if (typeof window !== 'undefined') {
      localStorage.setItem('tavus-api-key', apiKey);
    }
  }

  private getHeaders() {
    if (!this.apiKey) {
      throw new Error('Tavus API key not configured. Please set your API key first.');
    }

    return {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    };
  }

  // Create a new persona using Tavus API
  async createPersona(personaData: TavusPersonaRequest): Promise<TavusPersonaResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/personas`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(personaData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Tavus API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating Tavus persona:', error);
      throw error;
    }
  }

  // Create a conversation with a replica (using the exact format you provided)
  async createConversation(conversationData: TavusConversationRequest): Promise<TavusConversationResponse> {
    try {
      console.log('Creating Tavus conversation with data:', conversationData);
      
      const response = await fetch(`${this.baseUrl}/conversations`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(conversationData),
      });

      console.log('Tavus API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Tavus API error response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        throw new Error(`Tavus API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('Tavus conversation created successfully:', result);
      return result;
    } catch (error) {
      console.error('Error creating Tavus conversation:', error);
      throw error;
    }
  }

  // Get all available replicas
  async getReplicas(): Promise<TavusReplica[]> {
    try {
      const response = await fetch(`${this.baseUrl}/replicas`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Tavus API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.replicas || [];
    } catch (error) {
      console.error('Error fetching Tavus replicas:', error);
      throw error;
    }
  }

  // Get persona details
  async getPersona(personaId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/personas/${personaId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Tavus API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Tavus persona:', error);
      throw error;
    }
  }

  // Get conversation details
  async getConversation(conversationId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/conversations/${conversationId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Tavus API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Tavus conversation:', error);
      throw error;
    }
  }

  // Send message to conversation
  async sendMessage(conversationId: string, message: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          message_text: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Tavus API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Helper method to create a conversation URL for embedding
  getConversationEmbedUrl(conversationId: string): string {
    return `https://tavusapi.com/conversations/${conversationId}`;
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return this.apiKey !== null && this.apiKey.length > 0;
  }

  // Clear API key
  clearApiKey(): void {
    this.apiKey = 'c0d9482ab5af4934bc1ee332653263fc'; // Reset to default
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tavus-api-key');
    }
  }

  // Test API key validity
  async testApiKey(): Promise<boolean> {
    try {
      await this.getReplicas();
      return true;
    } catch (error) {
      console.error('API key test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const tavusApi = new TavusApiService();

// Export types for use in components
export type {
  TavusPersonaRequest,
  TavusConversationRequest,
  TavusPersonaResponse,
  TavusConversationResponse,
  TavusReplica,
};