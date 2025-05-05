import { getPageDimentions } from "./calculate.js";
import fs from 'node:fs';

export function printer(doc, printArr) {
  doc.pipe(fs.createWriteStream('test.pdf')); // write to PDF
  for (let i = 0; i < printArr.length; i++) {
    const printElem = printArr[i];
    if (!printElem) {
      addNewPage(doc);
    } else if (printElem.data) {
      doc.table({
        ...printElem,
        position: { x: doc.x, y: printElem.yCord }
      });
    } else {
      console.log(printElem)
      doc.text(printElem.text, doc.x, printElem.yCord);
    }
  }
  doc.end();
}

function addNewPage(doc) {
  const { LEFT_MARGIN, RIGHT_MARGIN } = getPageDimentions();
  doc.addPage({
    size: 'A4',
    margins: {
      top: 0,
      bottom: 0,
      left: LEFT_MARGIN,
      right: RIGHT_MARGIN
    },
    layout: "portrait"
  });
}