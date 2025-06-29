import { create } from 'zustand';

interface VideoState {
  localStream: MediaStream | null;
  remoteStreams: Map<string, MediaStream>;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  participants: Map<string, any>;
  roomId: string | null;
  isConnected: boolean;
  setLocalStream: (stream: MediaStream | null) => void;
  addRemoteStream: (peerId: string, stream: MediaStream) => void;
  removeRemoteStream: (peerId: string) => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleScreenShare: () => Promise<void>;
  addParticipant: (peerId: string, participant: any) => void;
  removeParticipant: (peerId: string) => void;
  setRoomId: (roomId: string | null) => void;
  setConnected: (connected: boolean) => void;
  cleanup: () => void;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  localStream: null,
  remoteStreams: new Map(),
  isVideoEnabled: true,
  isAudioEnabled: true,
  isScreenSharing: false,
  participants: new Map(),
  roomId: null,
  isConnected: false,

  setLocalStream: (stream) => {
    set({ localStream: stream });
  },

  addRemoteStream: (peerId, stream) => {
    const { remoteStreams } = get();
    const newStreams = new Map(remoteStreams);
    newStreams.set(peerId, stream);
    set({ remoteStreams: newStreams });
  },

  removeRemoteStream: (peerId) => {
    const { remoteStreams } = get();
    const newStreams = new Map(remoteStreams);
    newStreams.delete(peerId);
    set({ remoteStreams: newStreams });
  },

  toggleVideo: () => {
    const { localStream, isVideoEnabled } = get();
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        set({ isVideoEnabled: !isVideoEnabled });
      }
    }
  },

  toggleAudio: () => {
    const { localStream, isAudioEnabled } = get();
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        set({ isAudioEnabled: !isAudioEnabled });
      }
    }
  },

  toggleScreenShare: async () => {
    const { isScreenSharing, localStream } = get();
    
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        
        set({ 
          localStream: screenStream, 
          isScreenSharing: true,
          isVideoEnabled: true 
        });
      } else {
        // Switch back to camera
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
        }
        
        set({ 
          localStream: cameraStream, 
          isScreenSharing: false,
          isVideoEnabled: true 
        });
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  },

  addParticipant: (peerId, participant) => {
    const { participants } = get();
    const newParticipants = new Map(participants);
    newParticipants.set(peerId, participant);
    set({ participants: newParticipants });
  },

  removeParticipant: (peerId) => {
    const { participants } = get();
    const newParticipants = new Map(participants);
    newParticipants.delete(peerId);
    set({ participants: newParticipants });
  },

  setRoomId: (roomId) => {
    set({ roomId });
  },

  setConnected: (connected) => {
    set({ isConnected: connected });
  },

  cleanup: () => {
    const { localStream, remoteStreams } = get();
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    remoteStreams.forEach(stream => {
      stream.getTracks().forEach(track => track.stop());
    });
    
    set({
      localStream: null,
      remoteStreams: new Map(),
      participants: new Map(),
      roomId: null,
      isConnected: false,
      isScreenSharing: false,
    });
  },
}));