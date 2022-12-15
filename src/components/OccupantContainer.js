//Import qr-code
import QRCode from "react-qr-code";

//Import custom hook
import { useOccupantsContext } from "../hooks/useOccupantsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Import icon
import removeIcon from "../assets/remove-icon.png";

const OccupantContainer = ({ occupant }) => {
  const { dispatch } = useOccupantsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    //check if user is authorized before dispatching delete
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://barangay-cencus-api.onrender.com/api/v1/occupants/" +
        occupant._id,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_OCCUPANT", payload: json });
    }
  };
  return (
    <div className="occupant-container">
      <h3>MEMBER DETAILS:</h3>
      <h4 style={{ textTransform: "capitalize" }}>
        {occupant.firstName} {occupant.middleName} {occupant.lastName}
      </h4>
      <ul>
        <li>
          <b>First Name:</b> {occupant.firstName.toUpperCase()}
        </li>
        <li>
          <b>Middle Name:</b> {occupant.middleName.toUpperCase()}
        </li>
        <li>
          <b>Last Name:</b> {occupant.lastName.toUpperCase()}
        </li>
        <li>
          <b>Sex:</b> {occupant.sex.toUpperCase()}
        </li>
        <li>
          <b>Birthdate:</b> {occupant.birthDate}
        </li>
        <li>
          <b>Place of birth:</b> {occupant.placeOfBirth.toUpperCase()}
        </li>
        <li>
          <b>Address:</b> {occupant.address.toUpperCase()}
        </li>
        <li>
          <b>Contact number:</b> {occupant.contactNumber}
        </li>
        <li>
          <b>Civil status:</b> {occupant.civilStatus.toUpperCase()}
        </li>
        <li>
          <b>Highest educational attainment:</b>{" "}
          {occupant.education.toUpperCase()}
        </li>
        <li>
          <b>Citizenship</b>: {occupant.citizenship.toUpperCase()}
        </li>
        <li>
          <b>Occupation:</b> {occupant.occupation.toUpperCase()}
        </li>
        <li>
          <b>Monthly income:</b> &#x20B1;{occupant.monthlyIncome}
        </li>
      </ul>
      <span onClick={handleClick}>
        <img src={removeIcon} alt="delete button logo" />
        Delete
      </span>
    </div>
  );
};

export default OccupantContainer;
