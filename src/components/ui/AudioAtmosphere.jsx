import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

/**
 * Procedural Audio Atmosphere (Dialed Coffee / Awwwards immersive sound)
 * Synthesizes a soothing warm ambient background tone with subtle grill sizzle,
 * and synchronized deep rolling thunder rumbles on lightning strikes.
 * Fully self-contained via Web Audio API (no external MP3 downloads required).
 */
export default function AudioAtmosphere() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const noiseSourceRef = useRef(null);
  const toneOscRef = useRef(null);

  // Play procedural thunder rumble on lightning strike
  const playThunderRumble = () => {
    const ctx = audioCtxRef.current;
    const masterGain = gainNodeRef.current;
    if (!ctx || !masterGain || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime + 0.25; // slight speed-of-sound delay

      // 1. Deep Sub-bass Rumble Drone (38Hz -> 28Hz)
      const rumbleOsc = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      rumbleOsc.type = 'sine';
      rumbleOsc.frequency.setValueAtTime(42, now);
      rumbleOsc.frequency.exponentialRampToValueAtTime(28, now + 2.5);

      rumbleGain.gain.setValueAtTime(0.001, now);
      rumbleGain.gain.linearRampToValueAtTime(0.18, now + 0.15); // initial boom
      rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8); // rolling decay

      rumbleOsc.connect(rumbleGain);
      rumbleGain.connect(masterGain);
      rumbleOsc.start(now);
      rumbleOsc.stop(now + 2.9);

      // 2. Filtered Rolling Noise (Lowpass rumble sound)
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 1.2));
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(120, now);
      lowpass.frequency.linearRampToValueAtTime(60, now + 2.2);

      const thunderNoiseGain = ctx.createGain();
      thunderNoiseGain.gain.setValueAtTime(0.001, now);
      thunderNoiseGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      thunderNoiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      noiseSource.connect(lowpass);
      lowpass.connect(thunderNoiseGain);
      thunderNoiseGain.connect(masterGain);
      noiseSource.start(now);
      noiseSource.stop(now + 2.9);
    } catch (e) {
      console.warn('Thunder audio synthesis failed:', e);
    }
  };

  const startAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Warm low-frequency drone (55Hz / 110Hz warm ambient tavern hum)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      oscGain.gain.value = 0.08;
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      toneOscRef.current = osc;

      // 2. Gentle grill sizzle / ember crackle (filtered white noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass filter to sound like gentle ember sizzle
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.035;

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();
      noiseSourceRef.current = whiteNoise;

      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio could not start:', e);
    }
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          toneOscRef.current?.stop();
          noiseSourceRef.current?.stop();
          ctx.close();
        } catch (e) {}
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 850);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Listen for thunder strikes across the window
  useEffect(() => {
    const handleThunder = () => {
      if (isPlaying) {
        playThunderRumble();
      }
    };

    window.addEventListener('prison-thunder-strike', handleThunder);
    return () => window.removeEventListener('prison-thunder-strike', handleThunder);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      try {
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      } catch (e) {}
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      title={isPlaying ? 'Mute Storm & Prison Sound' : 'Turn On 3D Prison Storm & Sound Experience'}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md ${
        isPlaying
          ? 'bg-prison-gold/20 border-prison-gold text-prison-gold shadow-glow-gold'
          : 'bg-prison-900/80 border-prison-800 text-slate-400 hover:text-slate-200 hover:border-prison-700'
      }`}
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3 w-3.5">
            <span className="w-0.5 bg-prison-gold rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
            <span className="w-0.5 bg-prison-gold rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.2s] h-2/3" />
            <span className="w-0.5 bg-prison-gold rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.4s] h-4/5" />
          </div>
          <span className="hidden sm:inline">3D Sound: On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
          <span className="hidden sm:inline">Sound: Off</span>
        </>
      )}
    </button>
  );
}
