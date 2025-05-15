export function getTableRowHeight(doc, rowData, element, maxWidth) {
  let maxCellHeight = 0;
  for (let i = 0; i < rowData.length; i++) {
    let cellWidth;
    if(typeof element.columnStyles === 'function') {
      cellWidth = element.columnStyles(i).width;
    } else {
      cellWidth = element.columnStyles?.[i];
    }
    if(cellWidth === '*') {
      cellWidth = getColumnWidths(element, maxWidth);
    }
    let iHeight = doc.heightOfString(rowData[i]?.text || rowData[i] || "-", {
      columns: 1,
      width: cellWidth,
    });
    // this accounts for 0.25em padding (top, left, right and bottom) for cell (0.25em = 3pt)
    iHeight += 3; 
    if (iHeight > maxCellHeight) maxCellHeight = iHeight;
  }
  return maxCellHeight;
}

function getColumnWidths(element, maxWidth) {
  let specifiedColumnWidths = 0;
  let numberOfColumnsWidthSpecified = 0;
  for (let i = 0; i < element.data[0].length; i++) {
    let columnWidth = element.columnStyles(i).width;
    if(typeof columnWidth === 'number') {
      specifiedColumnWidths += columnWidth;
      numberOfColumnsWidthSpecified++;
    } else if(columnWidth !== "*") {
      throw Error("Invalid columnStyle type. Column width should be a 'Number'!");
    }
  }
  const widthOfStarColumns = (maxWidth - specifiedColumnWidths)/(element.data[0].length - numberOfColumnsWidthSpecified);
  return widthOfStarColumns; 
}

/**
 * @returns Margins, height and widths (assuming A4 page size and margin of 72pts)
 */
export function getPageDimentions(layout = "portrait") {
  let LEFT_MARGIN = 36, RIGHT_MARGIN = 36, TOP_MARGIN = 36, BOTTOM_MARGIN = 36;
  const WIDTH = 595.28; // A4 width in pts
  const HEIGHT = 841.89; // A4 height in pts
  
  let USABLE_WIDTH = WIDTH - (LEFT_MARGIN + RIGHT_MARGIN);
  let USABLE_HEIGHT = HEIGHT - (TOP_MARGIN + BOTTOM_MARGIN);
  let maxYCord = USABLE_HEIGHT + TOP_MARGIN;
  if(layout === 'landscape') {
    USABLE_WIDTH = HEIGHT - (TOP_MARGIN + BOTTOM_MARGIN);
    USABLE_HEIGHT = WIDTH - (LEFT_MARGIN + RIGHT_MARGIN);
  }

  return {
    USABLE_HEIGHT, USABLE_WIDTH, maxYCord, LEFT_MARGIN, RIGHT_MARGIN, TOP_MARGIN, BOTTOM_MARGIN
  }
}