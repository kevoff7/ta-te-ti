interface MatrixProps {
  index: number;
  box: string;
  winner: {check: boolean; win?: string};
  updateMatrix: (index: number) => void;
  match?: number[];
}
export const Matrix = ({index, box, winner, match, updateMatrix}: MatrixProps) => {
  return (
    <article
      key={`${index}`}
      className={`flex h-36 ${index % 3 === 0 && "border-r-4"} ${index % 3 === 2 && "border-l-4"} ${
        Math.floor(index / 3) === 0 && "border-b-4"
      } ${Math.floor(index / 3) === 2 && "border-t-4"}
      `}
    >
      {box === "" ? (
        <button className="w-full h-full" onClick={() => !winner.check && updateMatrix(index)} />
      ) : (
        <span
          className={`${
            match?.includes(index) && "bg-black"
          } w-full h-full flex items-center justify-center text-7xl`}
        >
          {box}
        </span>
      )}
    </article>
  );
};
