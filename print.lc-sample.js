import { pdfPrinter } from "./index.js";

function getDataToPrint() {
  // DB data {}
  return [
    {
      text: "Axana Hospital",
      bold: true,
      fontSize: 20,
      mb: 16,
    },
    getMeetingTitle(),
    getMeetingSubTitle(),
    getPatientName(),
    getDecisions()
  ];
}

function getMeetingTitle() {
  return [
    {
      text: "MDT Report • Lung Cancer • Meeting 1 • 03/ 01/ 2050 • 03:30 PM - 04:30 PM",
      bold: true,
      fontSize: 14,
      mb: 16,
    },
  ];
}

function getMeetingSubTitle() {
  return [
    {
      text: "This report has been created by: User 1 Test on 05/05/20205, 08:56AM",
      bold: true,
      fontSize: 11,
      mb: 16,
    },
  ];
}

function getPatientName() {
  return [
    {
      text: "Janis Joplin • 203947816 • 19/ 01/ 1943 • Female",
      bold: true,
      backgroundColor: "grey",
      fontSize: 15,
      mb: 16,
      rect: {
        padding: 16,
        fill: "gray",
      },
    },
  ];
}

function getDecisions() {
  return [
    {
      text: "Decisions",
      bold: true,
      backgroundColor: "grey",
      fontSize: 15,
      mb: 8,
      horizontalRule: {
        mt: 4,
        lineWidth: 1,
      }
    },
  ];
}

pdfPrinter(getDataToPrint());
