import { useContext, useState } from "react";
import { createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth";
import { useEffect } from "react/cjs/react.development";

export const ChargeContext = createContext();

export const ChargeContextProvider = ({ children }) => {
  const history = useHistory();
  const [charges, setCharges] = useState([]);
  const [charge, setCharge] = useState([]);
  const [statusPendente, setStatusPendente] = useState([]);
  const [statusVencido, setStatusVencido] = useState([]);
  const [statusPago, setStatusPago] = useState([]);
  const { token } = useContext(AuthContext);

  async function getCharges() {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/charges",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();
      console.log(dados);

      if (response.ok) {
        return setCharges(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  useEffect(() => {
    getCharges();
  }, []);

  async function getCharge(id) {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/charges/${id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();
      console.log(dados);

      if (response.ok) {
        return setCharge(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function getChargeStatusPendente() {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/reports/charges/pendente`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();
      console.log(dados);

      if (response.ok) {
        return setStatusPendente(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function getChargeStatusVencido() {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/reports/charges/vencido`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();
      console.log(dados);

      if (response.ok) {
        return setStatusVencido(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function getChargeStatusPago() {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/reports/charges/pago`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();
      console.log(dados);

      if (response.ok) {
        return setStatusPago(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function editCharges({ data, id, setOpenCharges }) {
    const body = {
      cliente: data.cliente,
      data_vencimento: data.data_vencimento,
      descricao: data.descricao,
      status: data.status,
      valor: data.valor,
    };
    const response = await fetch(
      `https://cubosacademy-projeto-5.herokuapp.com/charges/${id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const dados = await response.json();

    if (response.ok) {
      setOpenCharges(false);
      return SucessMessage(dados);
    }
    return ErrorMessage(dados);
  }

  async function createCharges({ data }) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/charges",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const dados = await response.json();

      if (response.ok) {
        history.push("/charges");
        return SucessMessage(dados);
      }
      return ErrorMessage(dados);
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  return (
    <ChargeContext.Provider //checkList integração:
      value={{
        charges,
        charge,
        getCharge,
        getChargeStatusPendente,
        statusPendente,
        getChargeStatusVencido,
        statusVencido,
        getChargeStatusPago,
        statusPago,
        setCharges,
        createCharges,
        editCharges,
        getCharges,
      }}
    >
      {children}
    </ChargeContext.Provider>
  );
};

export function useCharges() {
  return useContext(ChargeContext);
}
