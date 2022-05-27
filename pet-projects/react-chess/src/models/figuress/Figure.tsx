import { Colors } from "../Colors";
import { Cell } from "../Cell";

const logo = require('../../assets/black-bishop.png');

export enum FigureName {
  FIGURE = 'Фигура',
  KING = 'Король',
  KNIGHT = 'Конь',
  PAWN = 'Пешка',
  QUEEN = 'Королева',
  ROOK = 'Ладья',
  BISHOP = 'Слон',
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureName;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.cell = cell;
    this.color = color;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureName.FIGURE;
    this.id = Math.random();
  }

  cvanMove(target: Cell): boolean {
    return true;
  }

  moveFigure(target: Cell) {

  }
};
