//Import hook
import { useEffect } from "react";

//Import custom hook
import { useOccupantsContext } from "../hooks/useOccupantsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Import component
import OccupantContainer from "../components/OccupantContainer";
import OccupantForm from "../components/OccupantForm";
import Qrcode from "../components/Qrcode";

const Home = () => {
  // const [occupants, setOccupants] = useState([]);
  const { occupants, dispatch } = useOccupantsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchOccupants = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/v1/occupants", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        // setOccupants(json);
        dispatch({ type: "SET_OCCUPANTS", payload: json });
      }
      console.log(json);
      // setOccupants(json);
    };

    if (user) {
      fetchOccupants();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="occupants">
        <h2>House Occupants</h2>
        {occupants.map((occupant) => {
          return <OccupantContainer key={occupants._id} occupant={occupant} />;
        })}
      </div>
      <div>
        <OccupantForm />
        <Qrcode />
      </div>
    </div>
  );
};

export default Home;
