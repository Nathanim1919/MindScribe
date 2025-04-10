import { BlockType } from '../types/block.interface';
import { useBlockContext } from '../contexts/BlockContext';

export function useCommandOption(
  id: string | null,
  blocks: BlockType[],
  setIsCommandOptionVisible: (value: boolean) => void,
) {
  const { deleteBlock, setBlocks, updateBlock, changeBlockType } = useBlockContext();
  const block = blocks.find((block) => block.id === id);
  const index = blocks.findIndex((block)=> block.id === id);

  // **Copy Function**
  const handleCopy = () => {
    if (id !== null && block) {
      // Convert to JSON
      const blockData = JSON.stringify(block);

      // Copy to clipboard
      navigator.clipboard
        .writeText(blockData)
        .then(() => console.log('Block copied successfully!'))
        .catch((err) => console.error('Failed to copy:', err));
    } else {
      console.warn('No block found at index:', id);
    }

    setIsCommandOptionVisible(false);
  };

  const handlePaste = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();

      let parsedBlock:BlockType;
      try {
        parsedBlock = JSON.parse(clipboardData);
      } catch (error) {
        console.log(error);
        console.error('Clipboard data is not valid JSON:', clipboardData);
        return;
      }

      if (parsedBlock && parsedBlock.type && parsedBlock.content) {
        const newBlock = { ...parsedBlock, id: Date.now().toLocaleString() }; // Assign a new ID
        console.log('Update the block at index: ', id);

        
        if (!block) return;
        
        block.type = newBlock.type;
        block.content = newBlock.content;
        
        updateBlock(block.id, newBlock);
        console.log('Pasted block:', newBlock);
      } else {
        console.warn('Invalid block structure:', parsedBlock);
      }
    } catch (err) {
      console.error('Failed to paste:', err);
    }

    setIsCommandOptionVisible(false);
  };

  // **Cut Function (Copy & Remove)**
  const handleCut = () => {
    if (id !== null && index > 0 && block) {
  
      // Copy first
      navigator.clipboard
        .writeText(JSON.stringify(block))
        .then(() => {
          // Remove block after copying
          const newBlocks = blocks.filter((block) => block.id !== id);
          setBlocks(newBlocks);
        })
        .catch((err) => console.error('Failed to cut:', err));

      // then remove block
      deleteBlock(id);
    }
    setIsCommandOptionVisible(false);
  };

  // Hnalde block type change
  const handleBlockTypeChange = (newBlockType: BlockType['type']) => {
    if (id !== null)
    changeBlockType(id, newBlockType)
    setIsCommandOptionVisible(false);
  }

  // **Delete Function**
  const handleDelete = () => {
    if (id === null || index > blocks.length) {
      console.warn('No block found at index:', index);
      return;
    }
    deleteBlock(id);
    setIsCommandOptionVisible(false);
  };

  // **Undo Functionality (Future Enhancement)**
  const handleUndo = () => {
    console.log('Undo action (not implemented yet)');
    setIsCommandOptionVisible(false);
  };

  //TODO: **Redo Functionality (Future Enhancement)**
  const handleRedo = () => {
    console.log('Redo action (not implemented yet)');
    setIsCommandOptionVisible(false);
  };

  const handleDuplicate = () => {
    if (index !== null && blocks[index]) {
      // ✅ Create a deep copy with a unique ID
      const duplicatedBlock = {
        ...blocks[index],
        id: Date.now().toString(), // Ensuring a unique identifier
      };

      // ✅ Create a new array with the duplicated block inserted
      const newBlocks = [
        ...blocks.slice(0, index + 1),
        duplicatedBlock,
        ...blocks.slice(index + 1),
      ];

      // ✅ Update state properly
      setBlocks(newBlocks);
    } else {
      console.warn('No block found at index:', index);
    }

    setIsCommandOptionVisible(false);
  };

  return {
    handleCopy,
    handlePaste,
    handleCut,
    handleDelete,
    handleUndo,
    handleRedo,
    handleDuplicate,
    handleBlockTypeChange
  };
}
