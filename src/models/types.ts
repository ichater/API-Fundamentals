import { Color, PieceSymbol, Square } from 'chess.js';

export type Piece = {
  square?: Square | undefined;
  type?: PieceSymbol | undefined;
  color?: Color | undefined;
};

export type Board = (Piece | null)[][];

export type BoardSquare = {
  id: string;
  square?: Square | undefined;
  type?: PieceSymbol | undefined;
  color?: Color | undefined;
};

export type BoardWithIds = BoardSquare[][];

export type MakeMove = { from: string; to: string };
