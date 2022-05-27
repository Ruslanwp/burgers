import { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell
  selected: Boolean
  click: (cell: Cell) => void
}

export const CellComponent: FC<CellProps> = ({cell, selected, click }) => {
  // console.log(cell);
  
  return (
    <div
      onClick={() => click(cell)}
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
    >
      {cell.available && !cell.figure && <div className={'available'}></div>}
      {cell.figure?.logo && <img src={cell.figure.logo}/>}
    </div>
  )
};
