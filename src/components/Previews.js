import React from "react";
import { Preview } from "./index";

const Previews = ({ tetrominoes }) => {
  // except the last joined one [5, 1, 2, 3, 4] => [4, 3, 2, 1]
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview key={index} tetromino={tetromino} index={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);
