import PDFDocument from 'pdfkit';
import { printer } from './printer.js';
import { getTableRowHeight, getPageDimentions } from "./calculate.js";

export function pdfPrinter(data, options) {
  const doc = new PDFDocument({
    ...options,
    margin: 72 //overrides margin
  });

  const printArray = [];
  const { maxYCord, USABLE_WIDTH, TOP_MARGIN } = getPageDimentions();

  let breakableAtIndex = 0, currentYCord = TOP_MARGIN;

  function depthFirstTraverse(data) {
    data.forEach((element, index) => {
      if (Array.isArray(element)) {
        if (index > 0) breakableAtIndex = printArray.length - 1;
        depthFirstTraverse(element);
      } else {
        calculateAndBreak(element);
      }
    });
  }

  function calculateAndBreak(element) {
    if (element.data) {
      tableCalculateAndBreak(element);
    } else {
      paraCalculateAndBreak(element);
    }
  }

  function paraCalculateAndBreak(element) {
    let height = doc.heightOfString(element.text, element.options)
    // add margin bottom if provided
    height += element.mb ?? 0;
    // if the paragraph fits in the page
    if (currentYCord + height < maxYCord) {
      printArray.push({ ...element, yCord: currentYCord, height })
      currentYCord += height;
    } else {
      // page break logic
    }
  }

  function tableCalculateAndBreak(element) {
    const tablePrintArray = [];
    let tableHeight = 0;
    for (let rowIndex = 0; rowIndex < element.data.length; rowIndex++) {
      let row = element.data[rowIndex];
      let heightOfRow = getTableRowHeight(doc, row, element.columnStyles, USABLE_WIDTH);
      if (tableHeight + heightOfRow < maxYCord) {
        tablePrintArray.push(row);
        tableHeight += heightOfRow;
      } else {
        // if we were able to squeeze in less than 2 rows on the page
        if (rowIndex < 2) {
          // add page break at index aka heading (null indicates page breaks)
          printArray.splice(breakableAtIndex, 0, null);
          // move yCord to top
          currentYCord = TOP_MARGIN;
          // map the yCord of the headings to the new-page
          for (let index = breakableAtIndex + 1; index < printArray.length; index++) {
            const printElem = printArray[index];
            const prevElem = index - 1 >= 0 ? printArray[index - 1] : undefined;
            printElem.yCord = currentYCord + prevElem?.height ?? 0;

            if (index === printArray.length - 1) {
              yCord += prevElem.height;
            }
          }
          // re-run table calculation with the yCord and print array re-adjusted
          tableCalculateAndBreak(element);
          break;
        }
        else {
          printArray.push({
            yCord: currentYCord,
            height: tableHeight,
            data: [...tablePrintArray]
          });
          // add page break
          printArray.push(null);

          currentYCord = TOP_MARGIN;

          const newPageTableRows = [
            element.data[0], // copy over the header row for the new page
            ...element.data.slice(rowIndex)
          ]

          const newElement = {
            ...element,
            data: newPageTableRows
          }

          tableCalculateAndBreak(newElement);
          break;
        }
      }
    }
    // push tablePrintArray to printArray
    printArray.push({
      yCord: currentYCord,
      height: tableHeight,
      data: [...tablePrintArray]
    });
  }

  depthFirstTraverse(data);
  printer(doc, printArray);
}