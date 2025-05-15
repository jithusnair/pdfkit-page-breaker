import { getPageDimentions } from "./calculate.js";
import fs from 'node:fs';

export function printer(doc, printArr, layout) {
  const { LEFT_MARGIN } = getPageDimentions(layout);

  doc.pipe(fs.createWriteStream('test.pdf')); // write to PDF
  for (let i = 0; i < printArr.length; i++) {
    const printElem = printArr[i];
    if (printElem) {
      doc.fontSize(printElem.fontSize?? 12);
      doc.font(printElem.bold? "Helvetica-Bold": "Helvetica");
    }
    if(printElem?.horizontalRule) {
      addHorizontalRule(doc, printElem);
    } else if (printElem?.data) {
      doc.table({
        ...printElem,
        position: { x: doc.x, y: printElem.yCord }
      });
    } else if(printElem?.text) {
      if(printElem.rect) {
        addTextInRect(doc, printElem);
      } else if(printElem.horizontalRule) {
        addHorizontalRule(doc, printElem, layout);
      } else {
        doc.text(printElem.text, LEFT_MARGIN, printElem.yCord);
      }
    } else {
      addNewPage(doc, layout);
    }
  }
  doc.end();
}

/**
 * @param doc - pdfkit document
 * @param printElem - horizontal rule element to be printed
 */
function addHorizontalRule(doc, printElem, layout) {
  const { LEFT_MARGIN, RIGHT_MARGIN } = getPageDimentions(layout);
  
  doc.text(printElem.text, LEFT_MARGIN, printElem.yCord);
  const yCordOfLine = printElem.yCord + printElem.height - printElem.horizontalRule.lineWidth - printElem.mb;
  doc
    .lineWidth(printElem.horizontalRule.lineWidth)
    .moveTo(0 + LEFT_MARGIN, yCordOfLine)
    .lineTo(doc.page.width - RIGHT_MARGIN, yCordOfLine)
    .stroke();
  
  doc.lineWidth(1);
  
  return doc
}

function addTextInRect(doc, printElem, layout) {
  const { USABLE_WIDTH, LEFT_MARGIN } = getPageDimentions(layout);
  const lineGap = printElem.lineGap ?? 4; // 4 being the default lineGap
  doc.rect(doc.x, printElem.yCord, USABLE_WIDTH, printElem.height - printElem.mb - lineGap).fillOpacity(0.1).fill(printElem.rect.fill);
  
  // reset the text fill and opacity first
  doc.fillOpacity("1").fill("black");
  // print the text in the rect
  doc.text(printElem.text, LEFT_MARGIN + printElem.rect.padding, printElem.yCord + printElem.rect.padding);
}

function addNewPage(doc, layout) {
  const { LEFT_MARGIN, RIGHT_MARGIN } = getPageDimentions(layout);
  doc.addPage({
    size: 'A4',
    margins: {
      top: 0,
      bottom: 0,
      left: LEFT_MARGIN,
      right: RIGHT_MARGIN
    },
    layout
  });
}