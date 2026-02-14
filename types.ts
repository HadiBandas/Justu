export type BloomStage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface BurstPetal extends Petal {
  vx: number;
  vy: number;
  color: string;
}

export interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}
