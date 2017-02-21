// Function to limit character count to 255 for a single document.
const characterCount = (doc) => {
  // Blocks are held in an array. Example: Blocks: Array[10]
  const allBlocks = doc.body.blocks;
  const blockArray = [];
  let textToString = '';
  let characterSelection = '';

  // Push the split single blocks into an array of subarrays.
  allBlocks.forEach((block) => {
    const singleBlock = block.text.split('  ');
    blockArray.push(singleBlock);
  });

  // Flatten the array of arrays.
  const flatBlockArray = blockArray.reduce((a, b) => (
     a.concat(b)
  ));

  // Add all characters to finalString.
  flatBlockArray.forEach(val => (
    textToString += val
  ));

  // Filter characters below index position 255.
  for (let j = 0; j < textToString.length; j += 1) {
    if (j < 255) {
      characterSelection += textToString[j];
    }
  }

  return characterSelection;
};

export default characterCount;
