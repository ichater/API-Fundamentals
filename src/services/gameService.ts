import { Chess, type Square } from 'chess.js';

const chess = new Chess();

// chess.move('e4');
// chess.move('e5');
// chess.move('f4');

// console.log(chess.ascii());

// console.log(chess.fen());

// // chess.history({verbose:true}) returns an array of moves made in the game

// const history = chess.history({ verbose: true });

// // console.log(history);

// const backAMove = new Chess(history[history.length - 1].before);

// console.log(backAMove.ascii());

export const getMoves = (chess: Chess, move: Square) => {
  const moves = chess.moves({ square: move, verbose: true });
  // will return empty array if no moves are available for the piece on the square
  return moves;
};

export const newGame = () => {
  const chess = new Chess();
  return chess;
};

const squareArray: Square[] = [
  'a8',
  'b8',
  'c8',
  'd8',
  'e8',
  'f8',
  'g8',
  'h8',
  'a7',
  'b7',
  'c7',
  'd7',
  'e7',
  'f7',
  'g7',
  'h7',
  'a6',
  'b6',
  'c6',
  'd6',
  'e6',
  'f6',
  'g6',
  'h6',
  'a5',
  'b5',
  'c5',
  'd5',
  'e5',
  'f5',
  'g5',
  'h5',
  'a4',
  'b4',
  'c4',
  'd4',
  'e4',
  'f4',
  'g4',
  'h4',
  'a3',
  'b3',
  'c3',
  'd3',
  'e3',
  'f3',
  'g3',
  'h3',
  'a2',
  'b2',
  'c2',
  'd2',
  'e2',
  'f2',
  'g2',
  'h2',
  'a1',
  'b1',
  'c1',
  'd1',
  'e1',
  'f1',
  'g1',
  'h1',
];

export const isValidSquare = (square: string): square is Square => {
  return squareArray.includes(square as Square);
};
