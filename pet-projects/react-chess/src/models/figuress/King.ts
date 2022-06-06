import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";

const whiteLogo = require('../../assets/white-king.png');
const blackLogo = require('../../assets/black-king.png');

export class King extends Figure { 
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureName.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false; 
    }

    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    return ((dx === 1 && dy === 1) || (dx === 0 && dy === 1) || (dx === 1 && dy === 0));
  }
}
