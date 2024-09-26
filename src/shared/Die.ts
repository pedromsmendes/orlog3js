import type { ArrayLen } from '../types';

export enum FaceType {
  MeleeAtk = 1,
  RangedAtk = 2,
  MeleeBlk = 3,
  RangedBlk = 4,
  Steal = 5,
}

export type Die = ArrayLen<{ face: FaceType; golden: boolean }, 6>;

export const possibleDice: ArrayLen<Die, 6> = [
  [
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.RangedBlk, golden: false },
    { face: FaceType.RangedAtk, golden: true },
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.MeleeBlk, golden: false },
    { face: FaceType.Steal, golden: true },
  ],
  [
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.RangedBlk, golden: true },
    { face: FaceType.RangedAtk, golden: false },
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.Steal, golden: true },
    { face: FaceType.MeleeBlk, golden: false },
  ],
  [
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.RangedAtk, golden: true },
    { face: FaceType.Steal, golden: false },
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.MeleeBlk, golden: true },
    { face: FaceType.RangedBlk, golden: false },
  ],
  [
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.RangedBlk, golden: false },
    { face: FaceType.Steal, golden: true },
    { face: FaceType.RangedAtk, golden: false },
    { face: FaceType.MeleeBlk, golden: true },
    { face: FaceType.MeleeAtk, golden: false },
  ],
  [
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.RangedBlk, golden: true },
    { face: FaceType.Steal, golden: false },
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.MeleeBlk, golden: false },
    { face: FaceType.RangedAtk, golden: true },
  ],
  [
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.RangedBlk, golden: true },
    { face: FaceType.Steal, golden: false },
    { face: FaceType.MeleeAtk, golden: false },
    { face: FaceType.RangedAtk, golden: false },
    { face: FaceType.MeleeBlk, golden: true },
  ],
];
