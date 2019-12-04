# https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/

# 코드

```java
class Solution {
	public TreeNode sortedArrayToBST(int[] nums) {
		TreeNode root = makeTree(nums,0,nums.length);
		return root;
	}
	
	// start<=index<end
	public TreeNode makeTree(int[] nums,int start, int end) {
		if(start>=end) return null;
		int middle = (start+end)/2;
		TreeNode root = new TreeNode(nums[middle]);
		root.left = makeTree(nums,start,middle);
		root.right=makeTree(nums,middle+1,end);
		return root;
	}
}
class TreeNode {
	int val;
	TreeNode left;
	TreeNode right;
	TreeNode(int x){
		val =x;
	}
}
```

# 풀이법

첫 시도는 AVL 트리를 구현하여 풀려고 했지만. 이는 옳바른 풀이가 나이었다. 그 이유는 문제에서 주어지는 nums가 정렬되어진 배열이기 때문이다.

height balanced 트리가 되기 위해서는 , 루트 트리를 올바르게 지정하기만 하면 된다.

간단하게 정렬된 배열에서 가장 중앙에 위치한 엘리먼트가 놓이게 하면서 재귀적으로 트리를 구성하면 그것이 height balanced배열이 된다.

또한 이번 기회에 다시한번 AVL 트리를 공부하게 되서 좋은 문제였다고 생각한다.