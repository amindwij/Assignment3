import "./App.css";
import { deleteContract } from "./App";

export default function Escrow({
  address,
  broker,
  beneficiary,
  value,
  timelock,
  handleApprove,
  handleDelete,
}) {
  return (
    <div className="existing-contract1">
      <ul className="fields">
        <li>
          <div> Broker Address: {broker} </div>
        
        </li>
        <li>
          <div> Beneficiary Address : {beneficiary} </div>
         
        </li>
        <li>
          <div> Value : {value} </div>
        
        </li>
        <li>
          <div> Timelock : {timelock} seconds </div>
        
        </li>
        <div className="button-container">
          <div
            className="button approve-button"
            onClick={(event) => {
              event.preventDefault();
              handleApprove();
            }}
          >
            Approve 
          </div>
          <br></br>
          <div
            className="button delete-button"
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
          >
            Delete Contract
          </div>
        </div>
      </ul>
    </div>
  );
}
