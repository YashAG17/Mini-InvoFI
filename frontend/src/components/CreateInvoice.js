import { useState } from "react";
import { getContract } from "../contract";

export default function CreateInvoice(){

  const [buyer,setBuyer] = useState("");
  const [amount,setAmount] = useState("");

  const create = async () => {

    const contract = await getContract();

    const tx = await contract.createInvoice(
      buyer,
      amount
    );

    await tx.wait();

    alert("Invoice Created");
  };

  return(
    <div>

      <h3>Create Invoice</h3>

      <input placeholder="Buyer address"
      onChange={(e)=>setBuyer(e.target.value)}/>

      <input placeholder="Amount (wei)"
      onChange={(e)=>setAmount(e.target.value)}/>

      <button onClick={create}>
      Create
      </button>

    </div>
  );
}