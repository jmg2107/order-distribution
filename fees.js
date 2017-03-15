var fees = [
  {
    "order_item_type": "Real Property Recording",
    "fees": [
      {
        "name": "Recording (first page)",
        "amount": "26.00",
        "type": "flat"
      },
      {
        "name": "Recording (additional pages)",
        "amount": "1.00",
        "type": "per-page"
      }
    ],
    "distributions": [
      {
        "name": "Recording Fee",
        "amount": "5.00"
      },
      {
        "name": "Records Management and Preservation Fee",
        "amount": "10.00"
      },
      {
        "name": "Records Archive Fee",
        "amount": "10.00"
      },
      {
        "name": "Courthouse Security",
        "amount": "1.00"
      }
    ]
  },
  {
    "order_item_type": "Birth Certificate",
    "fees": [
      {
        "name": "Birth Certificate Fees",
        "amount": "23.00",
        "type": "flat"
      }
    ],
    "distributions": [
      {
        "name": "County Clerk Fee",
        "amount": "20.00"
      },
      {
        "name": "Vital Statistics Fee",
        "amount": "1.00"
      },
      {
        "name": "Vital Statistics Preservation Fee",
        "amount": "1.00"
      }
    ]
  }
];

module.exports = fees;