import type { FC, ReactNode } from "react";
import "./Card.css";

interface CardProps {
  title: string;
  children: ReactNode;
  id?: string;

}

const Card: FC<CardProps> = ({ title, children, id = "" }) => {
  return (
    <div className="glass-card-container" id={id}>
      <h3 className="glass-card-header">{title}</h3>
      <div className="glass-card-content">{children}</div>
    </div>
  );
};

Card.displayName = 'Card';

export default Card;