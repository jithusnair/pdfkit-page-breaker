import { pdfPrinter } from "./index.js";

function getDataToPrint() {
  return [
    {
      text: "Axana Hospital",
      bold: true,
      fontSize: 20,
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
    bold: true,
    fontSize: 14,
    mb: 16
  }];
}

function scheduledPatientsHeading() {
  return [{
    text: "Scheduled Patients",
    bold: true,
    fontSize: 16,
    mb: 16
  }];
}

function getTable() {
  const tableHeading = getTableHeading();
  const tableData = getTableData();
  return {
    rowStyles: function (i) {
      const styles = {};
      if(i === 0) {
        styles.border = { top: 1, bottom: 0 };     
      } else if(i === this.data.length - 1) {
        styles.border = { top: 0, bottom: 1 };
      } else {
        styles.border = { top: 0, bottom: 0 };
      }

      if(i < 1) {
        styles.textStroke = 0.1;
      } else {
        styles.textStroke = 0;
      }
      return styles;
    },
    columnStyles: function (i) {
      const styles = {};
      if(i > 0 && i < 4) {
        styles.width = 75;
      } else if(i === 5 || i === 6 ) {
        styles.width = 150;
      } else {
        styles.width = "*";
      }

      if(i === 0) {
        styles.border = { left: 1, right: 0 };
      } else if(i === this.data[0].length - 1) {
        styles.border = { left: 0, right: 1 };        
      } else {
        styles.border = { left: 0, right: 0 };
      }
      return styles;
    },
    data: [
      ...tableHeading,
      ...tableData,
    ],
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
    ], 
    [
      21,
      "Springsteen",
      "Bruce",
      "23/09/1949",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      22,
      "Dylan",
      "Bob",
      "24/05/1941",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      23,
      "Ledger",
      "Heath",
      "04/04/1979",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      24,
      "Tupac",
      "Shakur",
      "16/06/1971",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      25,
      "Houston",
      "Bobby",
      "04/09/1969",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      26,
      "Nicks",
      "Stevie",
      "26/05/1948",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      27,
      "Gaga",
      "Lady",
      "28/03/1986",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      28,
      "Shakur",
      "Afeni",
      "10/01/1947",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      29,
      "Hendrix",
      "Jimi",
      "27/11/1942",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      30,
      "Vaughan",
      "Stevie Ray",
      "03/10/1954",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      31,
      "Lennon",
      "John",
      "09/10/1940",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      32,
      "Stewart",
      "Rod",
      "10/01/1945",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      33,
      "Beyoncé",
      "Knowles",
      "04/09/1981",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      34,
      "Harris",
      "Pharrell",
      "05/04/1973",
      "Male",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      35,
      "Swift",
      "Taylor",
      "13/12/1989",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      36,
      "Shakira",
      "Isabel",
      "02/02/1977",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      37,
      "Woodstock",
      "Janis",
      "02/10/1940",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ],
    [
      38,
      "Rihanna",
      "Fenty",
      "20/02/1988",
      "Female",
      null,
      null,
      "Form",
      "Jithu S"
    ]
  ]
}

pdfPrinter(getDataToPrint(), { layout: "landscape" });