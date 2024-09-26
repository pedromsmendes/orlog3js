import type { SocketId } from 'socket.io-adapter';

import Player from './Player';
import { Game, GameMode, maxGamePlayers } from './Game';

export type LobbyPlayer = {
  ready: boolean;
  player: Player;
};

export class Lobby {
  lobbyLeaderId: SocketId;

  players: Map<SocketId, LobbyPlayer> = new Map();

  gameMode: GameMode;

  game: Game | null = null;

  constructor(leaderId: SocketId, leaderName: string) {
    this.lobbyLeaderId = leaderId;

    this.gameMode = GameMode.Beginner;

    this.players.set(this.lobbyLeaderId, {
      ready: false,
      player: new Player(leaderName),
    });
  }

  startGame() {
    if (!this.isEveryoneReady()) {
      throw new Error('Not every player is ready');
    }

    const players = [...this.players.values()].map((p) => p.player);
    this.game = new Game(players, this.gameMode);

    this.game.startGame();
  }

  toggleReadyPlayer(socketId: SocketId) {
    if (!this.players.has(socketId)) throw new Error('Invalid player');

    const player = this.players.get(socketId)!;
    player.ready = !player.ready;
    this.players.set(socketId, player);

    if (this.isEveryoneReady()) {
      // TODO everyone is ready, send event to leader to start game
    }
  }

  changeGameMode(newGameMode: GameMode) {
    this.gameMode = newGameMode;
  }

  isEveryoneReady() {
    const players = [...this.players.values()];
    return players.length === maxGamePlayers && !players.some((p) => !p.ready);
  }
}