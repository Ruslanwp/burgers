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
}
