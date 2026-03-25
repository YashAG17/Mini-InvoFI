// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InvoiceFactoring {
    struct Invoice {
        address supplier;
        address buyer;
        uint256 amount;
        uint256 fundedAmount;
        bool paid;
    }

    uint256 public invoiceCount;

    mapping(uint256 => Invoice) public invoices;

    // invoiceId → investor → amount invested
    mapping(uint256 => mapping(address => uint256)) public investments;

    // invoiceId → list of investors
    mapping(uint256 => address[]) public investors;

    // NEW: prevents duplicate investor entries
    mapping(uint256 => mapping(address => bool)) public hasInvested;

    event InvoiceCreated(uint256 invoiceId, address supplier, uint256 amount);
    event Invested(uint256 invoiceId, address investor, uint256 amount);
    event InvoicePaid(uint256 invoiceId);

    function createInvoice(address _buyer, uint256 _amount) public {
        invoiceCount++;

        invoices[invoiceCount] =
            Invoice({supplier: msg.sender, buyer: _buyer, amount: _amount, fundedAmount: 0, paid: false});

        emit InvoiceCreated(invoiceCount, msg.sender, _amount);
    }

    function invest(uint256 invoiceId) public payable {
        Invoice storage invoice = invoices[invoiceId];

        require(!invoice.paid, "Invoice already paid");

        // FIX 1: prevent overfunding
        require(invoice.fundedAmount + msg.value <= invoice.amount, "Investment exceeds invoice amount");

        investments[invoiceId][msg.sender] += msg.value;
        invoice.fundedAmount += msg.value;

        // FIX 2: prevent duplicate investor entries
        if (!hasInvested[invoiceId][msg.sender]) {
            investors[invoiceId].push(msg.sender);
            hasInvested[invoiceId][msg.sender] = true;
        }

        payable(invoice.supplier).transfer(msg.value);

        emit Invested(invoiceId, msg.sender, msg.value);
    }

    function payInvoice(uint256 invoiceId) public payable {
        Invoice storage invoice = invoices[invoiceId];

        require(msg.sender == invoice.buyer, "Not buyer");
        require(msg.value == invoice.amount, "Incorrect amount");
        require(!invoice.paid, "Invoice already paid");

        invoice.paid = true;

        address[] memory invs = investors[invoiceId];

        for (uint256 i = 0; i < invs.length; i++) {
            address investor = invs[i];
            uint256 investment = investments[invoiceId][investor];

            uint256 share = (msg.value * investment) / invoice.fundedAmount;

            payable(investor).transfer(share);
        }

        emit InvoicePaid(invoiceId);
    }
}
