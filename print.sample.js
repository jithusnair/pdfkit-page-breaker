import { pdfPrinter } from "./index.js";

function getDataToPrint() {
  return [
    {
      text: "Axana Hospital",
      mb: 16,
    },
    getMeetingTitle(),
    scheduledPatientsHeading(),
    getTable(),
  ];
}

function getMeetingTitle() {
  return [{
    text: "Meeting 1 • 03/01/2050 • 03:30 PM - 04:30 PM",
    mb: 16
  }];
}

function scheduledPatientsHeading() {
  return [{
    text: "Scheduled Patients",
    mb: 16
  }];
}

function getTable() {
  return {
    data: [
      ...getTableHeading(),
      ...getTableData(),
    ]
  }
}

function getTableHeading() {
  return [
    [
      "ID", "Last Name", "First Name", "Date of Birth", "Sex", "Reason for Discussion",
      "Notes", "Report Status", "Added by"
    ]
  ]
}

function getTableData() {
  return [
    [
      1,
      "Presley",
      "Elvis",
      "01/08/1935",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      2,
      "Jackson",
      "Michael",
      "29/08/1958",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      3,
      "Houston",
      "Whitney",
      "08/09/1963",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      4,
      "Mercury",
      "Freddie",
      "09/05/1946",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      5,
      "Marley",
      "Bob",
      "02/06/1945",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      7,
      "Franklin",
      "Aretha",
      "25/03/1942",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      8,
      "Bowie",
      "David",
      "01/08/1947",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      10,
      "Cobain",
      "Kurt",
      "20/02/1967",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      12,
      "Gaye",
      "Marvin",
      "12/04/1939",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      13,
      "Quintanilla",
      "Selena",
      "16/04/1971",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      14,
      "Charles",
      "Ray",
      "23/09/1930",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      15,
      "Joplin",
      "Janis",
      "19/01/1943",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      18,
      "Piaf",
      "Edith",
      "19/12/1915",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      19,
      "Sinatra",
      "Frank",
      "12/12/1915",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      20,
      "Haughton",
      "Aaliyah",
      "16/01/1979",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ]
  ]
}

pdfPrinter(getDataToPrint());