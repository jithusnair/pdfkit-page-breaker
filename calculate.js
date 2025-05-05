export function getTableRowHeight(doc, rowData, columnStyles, maxWidth) {
  let maxCellHeight = 0;
  for (let i = 0; i < rowData.length; i++) {
    let iHeight = doc.heightOfString(rowData[i]?.text || rowData[i] || "-", {
      columns: 1,
      width: columnStyles?.[i] || maxWidth / rowData.length,
    });
    if (iHeight > maxCellHeight) maxCellHeight = iHeight;
  }
  return maxCellHeight;
}

/**
 * @returns Margins, height and widths (assuming A4 page size and margin of 72pts)
 */
export function getPageDimentions() {
  let LEFT_MARGIN = 72, RIGHT_MARGIN = 72, TOP_MARGIN = 72, BOTTOM_MARGIN = 72;
  const WIDTH = 595.28; // A4 width in pts
  const HEIGHT = 841.89; // A4 height in pts
  const USABLE_WIDTH = WIDTH - (LEFT_MARGIN + RIGHT_MARGIN);
  const USABLE_HEIGHT = HEIGHT - (TOP_MARGIN + BOTTOM_MARGIN);

  return {
    USABLE_HEIGHT, USABLE_WIDTH, maxYCord: USABLE_HEIGHT + TOP_MARGIN, LEFT_MARGIN, RIGHT_MARGIN, TOP_MARGIN, BOTTOM_MARGIN
  }
}