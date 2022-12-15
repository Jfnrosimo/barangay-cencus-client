//Qrcode
import QRCode from "react-qr-code";

//import custom hook
import { useAuthContext } from "../hooks/useAuthContext";

const Qrcode = () => {
  const { user } = useAuthContext();

  // const [inputValue, setInputValue] = useState("");
  const download = () => {
    const svg = document.getElementById("QRcode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qrcode`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  return (
    <div className="qr-container">
      <h4>Get your QR code</h4>
      <div>
        <QRCode
          id="QRcode"
          size={256}
          style={{ width: "100%" }}
          value={user.token}
        />
      </div>
      <p>{user.email}</p>
      <p>{user.address}</p>
      <input
        className="download-btn"
        type="button"
        onClick={download}
        value="Download QR Code"
      />
    </div>
  );
};

export default Qrcode;
