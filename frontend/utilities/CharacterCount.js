// Function to limit character count to 255 for a single document.
const characterCount = (doc) => {
  // Blocks are held in an array. Example: Blocks: Array[10]
  const allBlocks = doc.body.blocks;
  let textToString = '';

  // Push the split single blocks into an array of subarrays. Regex is used to split on whitespace.
  const blockArray = allBlocks.map((block) => {
    const singleBlock = block.text.trim().split(/^$|\s+/);
    return singleBlock;
    // blockArray.push(singleBlock);
  });

  // Flatten the array of arrays.
  const flatBlockArray = blockArray.reduce((a, b) => (
     a.concat(b)
  ));

  // Add all characters to finalString.
  textToString = flatBlockArray.join(' ').slice(0, 254);

  return textToString;
};

export default characterCount;
