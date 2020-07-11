export interface PlayerHistoryEntry {
  timestamp: Date;
  trophies: number;
}

export interface BrawlerHistoryEntry {
  name: string;
  timestamp: Date|string;
  trophies: number;
}

export default interface History {
  playerHistory: PlayerHistoryEntry[];
  brawlerHistory: BrawlerHistoryEntry[];
}
