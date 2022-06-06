import React, { FC } from "react";
import { Figure } from "../models/figuress/Figure";
import "../App.css";

interface Props {
  title: string;
  figures: Figure[]
}

export const LostFigures: FC<Props> = ({title, figures}) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name} {figure.logo && (
            <img width={20} height={20} src={figure.logo}/>
          )}
        </div>
      ))}
    </div>
  )
};
