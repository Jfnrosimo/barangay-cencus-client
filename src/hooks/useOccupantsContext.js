import { OccupantsContext } from "../context/OccupantsContext";
import { useContext } from "react";

export const useOccupantsContext = () => {
  const context = useContext(OccupantsContext);

  if (!context) {
    throw Error("Not inside the Provider");
  }

  return context;
};
