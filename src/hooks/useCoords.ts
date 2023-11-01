import { Dispatch, SetStateAction, useState } from "react";
import { Coords } from "../services/CoordService";

export type CalculateCoordsFn = (index: number) => Coords;

type CoordHook = {
  location: Coords;
  setLocation: Dispatch<SetStateAction<Coords>>;
};

// passing in calculateCoords so we don't have to mess with storing rowSize here
export const useCoords = (
  index: number,
  calculateCoords: CalculateCoordsFn
): CoordHook => {
  const [location, setLocation] = useState(calculateCoords(index));

  return {
    location,
    setLocation,
  };
};
