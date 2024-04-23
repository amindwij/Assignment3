// App.js
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import deploy from "../scripts/deploy";
import Escrow from "./Escrow";
import "./App.css"; // Import custom CSS for styling

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

export async function deleteContract(escrowContract, signer) {
  const deleteTxn = await escrowContract.connect(signer).deleteContract();
  await deleteTxn.wait();
}

export async function setTimelock(escrowContract, signer, timelock) {
  const setTimelockTxn = await escrowContract
    .connect(signer)
    .setTimelock(timelock);
  await setTimelockTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }
    getAccounts();
  }, [account]);

  async function newContract() {
    const beneficiary = document.getElementById("beneficiary").value;
    const broker = document.getElementById("broker").value;
    const value = ethers.BigNumber.from(document.getElementById("wei").value);
    const timelock = document.getElementById("timelock").value;
    const escrowContract = await deploy(signer, broker, beneficiary, value);
    await setTimelock(escrowContract, signer, timelock);
    const escrow = {
      address: escrowContract.address,
      broker,
      beneficiary,
      value: value.toString(),
      timelock,
      handleApprove: async () => {
        try {
          await approve(escrowContract, signer);
          const element = document.getElementById(escrowContract.address);
          if (element) {
            element.className = "complete";
            element.innerText = "✅ Fund transfer approved";
          }
          await approve(escrowContract, signer);
        } catch (error) {
          console.error("Error approving transfer:", error);
        }
      },
      handleDelete: async () => {
        await deleteContract(escrowContract, signer);
        setEscrows(escrows.filter((item) => item.address !== escrow.address));
      },
    };
    setEscrows([...escrows, escrow]);
  }

  return (
    <div className="app-container">
     
      <div className="contract">
        <h1>Assignment 3</h1>
        <h1>Create Contract</h1>
        <label>
          Broker
          <input type="text" id="broker" placeholder="Enter Broker Address" />
        </label>
        <label>
          Fund Beneficiary
          <input type="text" id="beneficiary" placeholder="Enter Beneficiary Address" />
        </label>
        <label>
          Fund Amount
          <input type="text" id="wei" placeholder="Enter Amount" />
        </label>
        <label>
          Timelock 
          <input type="text" id="timelock" placeholder="Enter Timelock" />
        </label>
        <div className="button" onClick={newContract}>Deploy Contract</div>
      </div>
      <div className="existing-contracts">
        <h1>Contracts</h1>
        <div>
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
