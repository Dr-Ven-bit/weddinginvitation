/**
 * Web Audio Ambient Music Synthesizer for Wedding Invitation
 * Generates an ethereal, romantic plucked harp and warm acoustic resonance
 * in a peaceful, meditative modal scale.
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private currentNoteIndex: number = 0;

  // Romantic Pentatonic/Bayati wedding scale frequencies (Hz)
  private readonly scale: number[] = [
    220.0, // A3
    246.94, // B3
    293.66, // D4
    329.63, // E4
    369.99, // F#4
    440.0, // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    739.99, // F#5
    880.0, // A5
  ];

  private readonly arpeggioPatterns: number[][] = [
    [0, 2, 4, 7, 5, 3, 2, 4],
    [1, 3, 5, 8, 6, 4, 3, 5],
    [2, 4, 7, 9, 7, 4, 5, 2],
    [0, 3, 5, 7, 10, 8, 5, 3],
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  private playPluck(freq: number, time: number, duration: number = 2.2) {
    if (!this.ctx || !this.masterGain) return;

    // Dual oscillator for rich, warm plucked instrument tone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 1.002, time); // Subtle warm detune

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(350, time + duration);

    // Pluck envelope: rapid attack, gentle exponential decay
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(0.35, time + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.1);
    osc2.stop(time + duration + 0.1);
  }

  public play() {
    this.init();
    if (!this.ctx || this.isPlaying) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.currentNoteIndex = 0;
    let patternIdx = 0;
    let step = 0;

    const tick = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentPattern = this.arpeggioPatterns[patternIdx];
      const scaleDegree = currentPattern[step % currentPattern.length];
      const freq = this.scale[scaleDegree % this.scale.length];

      this.playPluck(freq, now, 2.5);

      // Add a soft harmonic bass pedal note every 8 steps
      if (step % 8 === 0) {
        const rootFreq = this.scale[0] / 2;
        this.playPluck(rootFreq, now, 3.8);
      }

      step++;
      if (step >= currentPattern.length) {
        step = 0;
        patternIdx = (patternIdx + 1) % this.arpeggioPatterns.length;
      }

      // Timing varies subtly for natural humanized cadence (~480ms per note)
      const tempoJitter = 440 + Math.sin(step) * 25;
      this.timer = window.setTimeout(tick, tempoJitter);
    };

    tick();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
