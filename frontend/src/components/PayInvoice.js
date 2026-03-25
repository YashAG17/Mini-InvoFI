import { useState } from "react";
import { getContract } from "../contract";
import { ethers } from "ethers";

export default function PayInvoice(){

const [id,setId]=useState("");
const [amount,setAmount]=useState("");

const pay = async()=>{

const contract = await getContract();

const tx = await contract.payInvoice(
id,
{value: ethers.parseEther(amount)}
);

await tx.wait();

alert("Invoice Paid");
};

return(

<div>

<h3>Buyer Pay Invoice</h3>

<input placeholder="Invoice ID"
onChange={(e)=>setId(e.target.value)}/>

<input placeholder="Amount"
onChange={(e)=>setAmount(e.target.value)}/>

<button onClick={pay}>
Pay
</button>

</div>
);
}