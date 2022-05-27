import { FC, useState } from "react";
import { Fragment } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { CellComponent } from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void
}

export const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = (cell: Cell) => {
    console.log(cell.figure);
    
    if (cell.figure) {
      setSelectedCell(cell);
    }
  }

  return (
    <div className='board'>
      {board.cells.map((row, index) => (
        <Fragment key={index}>
          {row.map((cell) => (
            <CellComponent
              click={click}
              cell={cell}
              key={cell.id}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
            /> 
          ))}
        </Fragment>
      ))}
    </div>
  )
};
