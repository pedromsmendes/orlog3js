import type Player from './Player';
import { allGodFavors, type GodFavor } from './GodFavor';

export const maxGamePlayers = 2;

export enum GameMode {
  Beginner,
  Casual,
  Expert,
}

export enum GamePhase {
  /* PRE GAME PHASES */
  FirstPlayerCoin, // Depending on game mode, randomly pick a player to start
  PickGodFavors, // Depending on game mode, players pick god favors

  /* IN GAME PHASES */
  Roll,
  GodFavor,
  Resolution,
  DiscardGodFavors, // Depending on game mode, players discard god favors
}

export class Game {
  running = false;

  round = 0;

  phase: GamePhase = GamePhase.FirstPlayerCoin;

  players: Player[] = [];

  gameMode: GameMode;

  godFavorsPool: GodFavor[] = [];

  constructor(players: Player[], gameMode: GameMode) {
    this.players = players;
    this.gameMode = gameMode;
  }

  startGame() {
    this.running = true;

    this.godFavorsPool = [
      ...(this.gameMode === GameMode.Beginner
        ? [
          allGodFavors.thorsStrike,
          allGodFavors.iðunnsRejuvenation,
          allGodFavors.odinsSacrifice,
        ]
        : [...Object.values(allGodFavors)]),
    ];
  }
}
