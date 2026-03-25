import { useState } from "react";
import { getContract } from "../contract";
import { ethers } from "ethers";

export default function Invest(){

const [id,setId]=useState("");
const [amount,setAmount]=useState("");

const invest = async()=>{

const contract = await getContract();

const tx = await contract.invest(
id,
{value: ethers.parseEther(amount)}
);

await tx.wait();

alert("Invested");
};

return(

<div>

<h3>Invest in Invoice</h3>

<input placeholder="Invoice ID"
onChange={(e)=>setId(e.target.value)}/>

<input placeholder="ETH amount"
onChange={(e)=>setAmount(e.target.value)}/>

<button onClick={invest}>
Invest
</button>

</div>
);
}