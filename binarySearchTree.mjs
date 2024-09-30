import mergeSortWithoutDuplicates from "./sort.mjs";
import { prettyPrint } from "./utils.mjs";

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = mergeSortWithoutDuplicates(array);

    return this.#sortedArrToBST(sortedArray, 0, sortedArray.length - 1);
  }

  printTree() {
    prettyPrint(this.root);
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (root.data === value) {
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      let succ = this.#findInorderSuccesor(root);
      root.key = succ.key;
      root.right = this.deleteItem(succ.key, root.right);
    }

    return root;
  }

  find(value) {
    if (this.root.data === value) {
      return this.root;
    }

    let curr = this.root;

    while (curr !== null) {
      if (value < curr.data) {
        curr = curr.left;
      } else if (value > curr.data) {
        curr = curr.right;
      } else {
        return curr;
      }
    }

    return null;
  }

  levelOrder(callback) {
    if (this.root === null) return;

    const queue = [];
    queue.push(this.root);

    let curr;
    while (queue.length !== 0) {
      curr = queue.shift();
      callback(curr);

      if (curr.left !== null) {
        queue.push(curr.left);
      }

      if (curr.right !== null) {
        queue.push(curr.right);
      }
    }
  }

  inOrder(callback, root = this.root) {
    if (root === null) return;

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (root === null) return;

    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (root === null) return;

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node = this.root) {
    if (node === null) {
      return null;
    }

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node = this.root) {
    let depth = 0;

    if (this.root === node) {
      return depth;
    }

    let curr = this.root;

    while (curr !== node) {
      if (node.data < curr.data) {
        curr = curr.left;
      } else if (node.data > curr.data) {
        curr = curr.right;
      }

      depth++;
    }

    return depth;
  }

  isBalanced(node = this.root) {
    let balanced = true;

    if (node === null) {
      return balanced;
    }

    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      balanced = false;
    }

    return Boolean(
      balanced * this.isBalanced(node.left) * this.isBalanced(node.right)
    );
  }

  rebalance() {
    const newArr = this.#getArray().map((node) => node.data);
    this.root = this.buildTree(newArr);
  }

  #getArray(node = this.root) {
    if (node === null) {
      return [];
    }

    return [...this.#getArray(node.left), node, ...this.#getArray(node.right)];
  }

  #findInorderSuccesor(root) {
    let curr = root.right;

    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }

    return curr;
  }

  #sortedArrToBST(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = parseInt((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.#sortedArrToBST(arr, start, mid - 1);
    root.right = this.#sortedArrToBST(arr, mid + 1, end);

    return root;
  }
}
