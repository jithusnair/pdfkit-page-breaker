import PDFDocument from 'pdfkit';
import { printer } from './printer.js';
import { getTableRowHeight, getPageDimentions } from "./calculate.js";

export function pdfPrinter(data, options) {
  const { maxYCord, USABLE_WIDTH, TOP_MARGIN } = getPageDimentions(options?.layout);

  const doc = new PDFDocument({
    ...options,
    size: "A4",
    margin: TOP_MARGIN, //overrides margin
  });

  const printArray = [];

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
    doc.fontSize(element.fontSize?? 12);

    if(element.bold) doc.font("Helvetica-Bold");
    else doc.font("Helvetica");

    let height = doc.heightOfString(element.text, element.options);
    if (element.horizontalRule) {
      height += element.horizontalRule.mt ?? 4;
      height += element.horizontalRule.lineWidth?? 1; 
    }
    // add margin bottom if provided
    height += element.mb ?? 0;
    height += ((element.rect?.padding ?? 0) * 2);
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
    let currentGroupStartIndex = -1; // Track the start of the current group
    
    for (let rowIndex = 0; rowIndex < element.data.length; rowIndex++) {
      let row = element.data[rowIndex];
      let heightOfRow = getTableRowHeight(doc, row, element, USABLE_WIDTH);
      
      // Check if this row is a group header
      const isGroupHeader = row[0] && typeof row[0] === 'object' && row[0].group === true;
      
      if (isGroupHeader) {
        // If this is a group header, check if we have enough space for at least one more row
        const hasNextRow = rowIndex + 1 < element.data.length;
        
        if (hasNextRow) {
          const nextRow = element.data[rowIndex + 1];
          const nextRowHeight = getTableRowHeight(doc, nextRow, element, USABLE_WIDTH);
          
          // If both the group header and at least one data row won't fit, break the page
          if (tableHeight + heightOfRow + nextRowHeight >= maxYCord && tablePrintArray.length > 0) {
            // Process what we have so far and start a new page
            printArray.push({
              ...element,
              yCord: currentYCord,
              height: tableHeight,
              data: [...tablePrintArray]
            });
            
            // Add page break
            printArray.push(null);
            currentYCord = TOP_MARGIN;
            
            // Create new element with remaining rows, including the group header
            const newPageTableRows = [
              element.data[0], // copy over the header row for the new page
              ...element.data.slice(rowIndex)
            ];
            
            const newElement = {
              ...element,
              data: newPageTableRows
            };
            
            tableCalculateAndBreak(newElement);
            break;
          }
        }
        
        // Mark the start of a new group
        currentGroupStartIndex = tablePrintArray.length;
      }
      
      // Check if the row fits on the current page
      if (tableHeight + heightOfRow < maxYCord) {
        tablePrintArray.push(row);
        tableHeight += heightOfRow;
        if(rowIndex === element.data.length - 1) {
          // push tablePrintArray to printArray
          printArray.push({
            ...element,
            yCord: currentYCord,
            height: tableHeight,
            data: [...tablePrintArray]
          });
        }
      } else {
        // Check if we're in a group and have only the group header on this page
        if (isGroupHeader || (currentGroupStartIndex !== -1 && tablePrintArray.length - currentGroupStartIndex <= 1)) {
          // We have a group header at the end of the page with no data rows
          // If we're not at the beginning of the table, add what we have so far (except the group header)
          if (tablePrintArray.length > 1) {
            // Remove the group header from tablePrintArray
            const groupHeader = tablePrintArray.pop();
            tableHeight -= heightOfRow;
            
            printArray.push({
              ...element,
              yCord: currentYCord,
              height: tableHeight,
              data: [...tablePrintArray]
            });
            
            // Add page break
            printArray.push(null);
            currentYCord = TOP_MARGIN;
            
            // Create new element with the group header and remaining rows
            const newPageTableRows = [
              element.data[0], // copy over the header row for the new page
              groupHeader,
              ...element.data.slice(rowIndex + 1)
            ];
            
            const newElement = {
              ...element,
              data: newPageTableRows
            };
            
            tableCalculateAndBreak(newElement);
            break;
          }
        }
        
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
              currentYCord += prevElem.height;
            }
          }
          // re-run table calculation with the yCord and print array re-adjusted
          tableCalculateAndBreak(element);
          break;
        }
        else {
          printArray.push({
            ...element,
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
  }

  depthFirstTraverse(data);
  printer(doc, printArray, options?.layout?? "portrait");
}