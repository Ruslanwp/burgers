import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";

const whiteLogo = require('../../assets/white-queen.png');
const blackLogo = require('../../assets/black-queen.png');

export class Queen extends Figure { 
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureName.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target))
      return false; 
    if (this.cell.isEmptyVertical(target)) {
      return true;
    };

    if (this.cell.isEmptyHorizontal(target)) {
      return true;
    };

    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    };

    return false;
  }
}
