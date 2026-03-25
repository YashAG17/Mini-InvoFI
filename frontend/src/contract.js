import { ethers } from "ethers";

const contractAddress = "0x663F3ad617193148711d28f5334eE4Ed07016602";

const abi = [
  {"type":"function","name":"createInvoice","inputs":[{"name":"_buyer","type":"address","internalType":"address"},{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"invest","inputs":[{"name":"invoiceId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"investments","inputs":[{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"investors","inputs":[{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"invoiceCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"invoices","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"supplier","type":"address","internalType":"address"},{"name":"buyer","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"fundedAmount","type":"uint256","internalType":"uint256"},{"name":"paid","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"payInvoice","inputs":[{"name":"invoiceId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"event","name":"Invested","inputs":[{"name":"invoiceId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"investor","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"InvoiceCreated","inputs":[{"name":"invoiceId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"supplier","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"InvoicePaid","inputs":[{"name":"invoiceId","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}
];

export const getContract = async () => {

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, abi, signer);
};