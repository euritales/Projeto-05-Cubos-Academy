import { PayStatus, ForeseenStatus, DefaultStatus } from "./detailsStatus.js";
import "./styles.css";

import { useEffect, useState } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth";
import { ChargeContext } from "../../context/charge";
import { ClientContext } from "../../context/client";
import { useHistory } from "react-router-dom";
import { useContext } from "react";

export function StatusClient({ nome, img }) {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  // const {
  //   getChargeStatusPendente,
  //   getChargeStatusPago,
  //   getChargeStatusVencido,
  //   statusPendente,
  //   statusPago,
  //   statusVencido,
  // } = useContext(ChargeContext);
  const { getClientStatusEmdia, getClientStatusInad, statusEmdia, statusInad } =
    useContext(ClientContext);

  useEffect(() => {
    async function callClientStatus() {
      await getClientStatusEmdia(token);
      await getClientStatusInad(token);
      // await getChargeStatusPendente(token);
      // await getChargeStatusPago(token);
      // await getChargeStatusVencido(token);
      return;
    }
    callClientStatus();
  }, []);

  return (
    <div className="container-status">
      <div className="head-status">
        <img src={img} alt="" />
        <span>{nome}</span>
      </div>
      <div className="details-status">
        <button onClick={() => history.push("/reports/clients/")}>
          <PayStatus
            situacao="Em dia"
            quantidade={statusEmdia.length ? statusEmdia.length : "0"}
          />
        </button>
        <button>
          <ForeseenStatus
            situacao="Inadimplentes"
            quantidade={statusInad.length ? statusInad.length : "0"}
          />
        </button>
      </div>
    </div>
  );
}

export function StatusCharges({ nome, img }) {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const {
    getChargeStatusPendente,
    getChargeStatusPago,
    getChargeStatusVencido,
    statusPendente,
    statusPago,
    statusVencido,
  } = useContext(ChargeContext);
  // const { getClientStatusEmdia, getClientStatusInad, statusEmdia, statusInad } =
  //   useContext(ClientContext);

  useEffect(() => {
    async function callClientStatus() {
      // await getClientStatusEmdia(token);
      // await getClientStatusInad(token);
      await getChargeStatusPendente(token);
      await getChargeStatusPago(token);
      await getChargeStatusVencido(token);
      return;
    }
    callClientStatus();
  }, []);
  return (
    <div className="container-status">
      <div className="head-status">
        <img src={img} alt="" />
        <span>{nome}</span>
      </div>
      <div className="details-status">
        <button onClick={() => history.push("/reports/charges/")}>
          <DefaultStatus
            situacao="Previstas"
            quantidade={statusPendente.length ? statusPendente.length : "0"}
          />
        </button>
        <button onClick={() => history.push("/reports/charges/")}>
          <ForeseenStatus
            situacao="Vencidas"
            quantidade={statusVencido.length ? statusVencido.length : "0"}
          />
        </button>
        <button onClick={() => history.push("/reports/charges/")}>
          <PayStatus
            situacao="Pagas"
            quantidade={statusPago.length ? statusPago.length : "0"}
          />
        </button>
      </div>
    </div>
  );
}
