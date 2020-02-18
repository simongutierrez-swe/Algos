function invertBinaryTree(tree) {
    if (tree === null) {
        return tree;
    } else {
        let temp = tree.left;
        tree.left = tree.right;
        tree.right = temp;
        invertBinaryTree(tree.left);
        invertBinaryTree(tree.right);
    }
  }
