import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureName } from "./Figure";

const whiteLogo = require('../../assets/white-bishop.png');
const blackLogo = require('../../assets/black-bishop.png');

export class Bishop extends Figure { 
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureName.BISHOP;
  }
}