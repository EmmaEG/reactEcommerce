import { React, useState } from "react";
import MercadoPagoCheckout from "react-mercadopago-checkout";
import axios from "axios";

const PayCheckoutPro = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const publicKey = process.env.MP_PKEY;
 

  const handleCheckout = async () => {
    const res = await axios.post("http://localhost:5000/api/checkout/payment");
    setPreferenceId(res.data.response.id);
    console.log(preferenceId);
    console.log(res);
  };

  return (
    <div>

      <div
      className="cho-container"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {preferenceId && (
          <MercadoPagoCheckout
            publicKey={publicKey}
            preferenceId={preferenceId}
            locale="es-AR"
          />
            )} 
        <button onClick={handleCheckout}>Open checkout</button>
      </div>
    </div>

    
  );
};

export default PayCheckoutPro;
