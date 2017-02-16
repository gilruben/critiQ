// Function to check reading time of a single document.
const readingTime = (doc) => {
  // Blocks are held in an array. Example: Blocks: Array[10]
  const allBlocks = doc.body.blocks;
  const blockArray = [];
  let numOfMin = 0;
  let readTime = '';
  // Push the split single blocks into an array of subarrays.
  allBlocks.forEach((block) => {
    const singleBlock = block.text.split(' ');
    blockArray.push(singleBlock);
  });
  // Flatten the array of arrays.
  const flatBlockArray = blockArray.reduce((a, b) => (
     a.concat(b)
  ));
  // Filter flattened array and remove spaces.
  const finalBlockArray = flatBlockArray.filter(word => (
     word !== ' '
  ));
  // Find the average reading time of a body of text.
  // Average reading time for an adult is 250 WPM.
  if (finalBlockArray.length < 250) {
    readTime = 'Less than 1 min read';
  } else {
    numOfMin = Math.round(finalBlockArray.length / 250);
    readTime = `${numOfMin} min read`;
  }
  return readTime;
};

export default readingTime;
