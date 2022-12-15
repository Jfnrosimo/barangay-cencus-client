//Import hooks
import { useState } from "react";

//Import hooks
import { useOccupantsContext } from "../hooks/useOccupantsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const OccupantForm = () => {
  const { dispatch } = useOccupantsContext();
  const { user } = useAuthContext();
  console.log(user);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  //option for sex
  const sexOptions = [
    { value: "", text: "--Choose options--" },
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
  ];
  const [sex, setSex] = useState(sexOptions[0].value);

  const [birthDate, setBirthDate] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  //options for civil status
  const civilStatusOptions = [
    { value: "", text: "--Choose options--" },
    { value: "single", text: "Single" },
    { value: "married", text: "Married" },
    { value: "widow/er", text: "Widow/er" },
    { value: "separated", text: "Separated" },
  ];
  const [civilStatus, setCivilStatus] = useState(civilStatusOptions[0].value);

  //options for highest educational attainment
  const educationOptions = [
    { value: "", text: "--Choose options--" },
    { value: "elementary", text: "Elementary" },
    { value: "highschool", text: "Highschool" },
    { value: "vocational course", text: "Vocational Course" },
    { value: "college", text: "College" },
  ];
  const [education, setEducation] = useState(educationOptions[0].value);

  const [citizenship, setCitizenship] = useState("");
  const [occupation, setOccupation] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");

  //Create error for submitting form
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please log in!");
      return;
    }

    const resetForm = () => {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setSex("");
      setBirthDate("");
      setPlaceOfBirth("");
      setAddress("");
      setContactNumber("");
      setCivilStatus("");
      setEducation("");
      setCitizenship("");
      setOccupation("");
      setMonthlyIncome("");
    };

    const occupant = {
      firstName,
      middleName,
      lastName,
      sex,
      birthDate,
      placeOfBirth,
      address,
      contactNumber,
      civilStatus,
      education,
      citizenship,
      occupation,
      monthlyIncome,
    };

    const response = await fetch(
      "https://barangay-cencus-api.onrender.com/api/v1/occupants",
      {
        method: "POST",
        body: JSON.stringify(occupant),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    console.log(occupant);
    if (!response.ok) {
      setError("Please fill out all the fields");
    }
    if (response.ok) {
      resetForm();
      setError(null);
      console.log("new member added", json);
      dispatch({ type: "CREATE_OCCUPANT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>ADD A NEW MEMBER</h3>
      <label>FIRST NAME:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label>MIDDLE NAME:</label>
      <input
        type="text"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      />

      <label>LAST NAME:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <div className="two-column-input">
        <div>
          <label>SEX:</label>
          <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
            {sexOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>BIRTH DATE:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
      </div>

      <label>PLACE OF BIRTH:</label>
      <input
        type="text"
        value={placeOfBirth}
        onChange={(e) => setPlaceOfBirth(e.target.value)}
      />

      <label>ADDRESS:</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <label>CONTACT NUMBER:</label>
      <input
        type="text"
        pattern="[0]{1}[9]{1}[0-9]{9}"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />

      <div className="two-column-input">
        <div>
          <label>CIVIL STATUS:</label>
          <select
            id="civilStatus"
            value={civilStatus}
            onChange={(e) => setCivilStatus(e.target.value)}
          >
            {civilStatusOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>HIGHEST EDUCATIONAL ATTAINMENT:</label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            {educationOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <label>CITIZENSHIP:</label>
      <input
        type="text"
        value={citizenship}
        onChange={(e) => setCitizenship(e.target.value)}
      />

      <label>OCCUPATION:</label>
      <input
        type="text"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />

      <label>MONTHLY INCOME:</label>
      <input
        type="number"
        value={monthlyIncome}
        onChange={(e) => setMonthlyIncome(e.target.value)}
      />

      <button>Add member</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default OccupantForm;
