import { Chess } from 'chess.js';
import { BoardWithIds } from '../models/types.js';

// This might only be needed for the ui

const rowMap: Record<string, string> = {
  ['0']: '8',
  ['1']: '7',
  ['2']: '6',
  ['3']: '5',
  ['4']: '4',
  ['5']: '3',
  ['6']: '2',
  ['7']: '1',
};

const colMap: Record<string, string> = {
  ['0']: 'a',
  ['1']: 'b',
  ['2']: 'c',
  ['3']: 'd',
  ['4']: 'e',
  ['5']: 'f',
  ['6']: 'g',
  ['7']: 'h',
};

// this is intended to bne the shape the ui will receive
export const generateBoard = (chess: Chess): BoardWithIds =>
  chess.board().map((row, rowIndex) =>
    row.map((piece, colIndex) => ({
      ...piece,
      id: `${colMap[colIndex]}${rowMap[rowIndex]}`,
    })),
  );
