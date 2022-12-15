import { createContext, useReducer } from "react";

export const OccupantsContext = createContext();

export const occupantsReducer = (state, action) => {
  switch (action.type) {
    case "SET_OCCUPANTS":
      return {
        occupants: action.payload,
      };
    case "CREATE_OCCUPANT":
      return {
        occupants: [action.payload, ...state.occupants],
      };
    case "DELETE_OCCUPANT":
      return {
        occupants: state.occupants.filter(
          (occupant) => occupant._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const OccupantsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(occupantsReducer, { occupants: [] });

  // dispatch({ type: "CREATE_OCCUPANTS", payload: [{}, {}] });

  return (
    <OccupantsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OccupantsContext.Provider>
  );
};
