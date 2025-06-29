import { useEffect, useRef, useCallback } from 'react';
import { useVideoStore } from '../stores/videoStore';
import toast from 'react-hot-toast';

interface UseWebRTCProps {
  roomId: string;
  userId: string;
}

export function useWebRTC({ roomId, userId }: UseWebRTCProps) {
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  const {
    setLocalStream,
    addRemoteStream,
    removeRemoteStream,
    addParticipant,
    removeParticipant,
    setConnected,
    cleanup,
  } = useVideoStore();

  const createPeerConnection = useCallback((peerId: string) => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    };

    const peerConnection = new RTCPeerConnection(configuration);
    peerConnections.current.set(peerId, peerConnection);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // In a real implementation, send this candidate to the remote peer
        console.log('ICE candidate:', event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      addRemoteStream(peerId, remoteStream);
    };

    peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', peerConnection.connectionState);
      if (peerConnection.connectionState === 'connected') {
        setConnected(true);
      } else if (peerConnection.connectionState === 'disconnected') {
        removeParticipant(peerId);
        removeRemoteStream(peerId);
      }
    };

    return peerConnection;
  }, [addRemoteStream, removeRemoteStream, addParticipant, removeParticipant, setConnected]);

  const initializeMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast.error('Failed to access camera and microphone');
      throw error;
    }
  }, [setLocalStream]);

  const joinRoom = useCallback(async () => {
    try {
      const stream = await initializeMedia();
      
      // In a real implementation, you would:
      // 1. Connect to a signaling server (WebSocket)
      // 2. Exchange offers/answers with other peers
      // 3. Handle ICE candidates
      
      // For demo purposes, we'll simulate a connection
      setTimeout(() => {
        setConnected(true);
        toast.success('Connected to video chat');
      }, 1000);

      return stream;
    } catch (error) {
      console.error('Error joining room:', error);
      toast.error('Failed to join video chat');
      throw error;
    }
  }, [initializeMedia, setConnected]);

  const leaveRoom = useCallback(() => {
    peerConnections.current.forEach((pc) => {
      pc.close();
    });
    peerConnections.current.clear();
    cleanup();
    toast.success('Left video chat');
  }, [cleanup]);

  useEffect(() => {
    return () => {
      leaveRoom();
    };
  }, [leaveRoom]);

  return {
    joinRoom,
    leaveRoom,
    createPeerConnection,
  };
}