import type { FaceType } from './Die';
import type { GodFavor } from './GodFavor';

export const maxHealth = 15;

class Player {
  name: string;

  health = maxHealth;

  gold = 0;

  actions: FaceType[] = [];

  godFavors: GodFavor[] = [];

  constructor(name: string) {
    this.name = name;
  }
}

export default Player;
