import Tree from "./binarySearchTree.mjs";
import { createRandomArray } from "./utils.mjs";

const randomArr = createRandomArray(15, 100);
console.log(randomArr);

const tree = new Tree(randomArr);
tree.printTree();

console.log(`Is the tree balanced: ${tree.isBalanced()}`);

console.log("Level Order");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre Order");
tree.preOrder((node) => console.log(node.data));

console.log("In Order");
tree.inOrder((node) => console.log(node.data));

console.log("Post Order");
tree.postOrder((node) => console.log(node.data));

tree.insert(454);
tree.insert(4324);
tree.insert(101);
tree.insert(435);

tree.printTree();

console.log(`Is the tree balanced: ${tree.isBalanced()}`);

console.log("Rebalancing...");
tree.rebalance();
console.log(`Is the tree balanced: ${tree.isBalanced()}`);

console.log("Level Order");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre Order");
tree.preOrder((node) => console.log(node.data));

console.log("In Order");
tree.inOrder((node) => console.log(node.data));

console.log("Post Order");
tree.postOrder((node) => console.log(node.data));
