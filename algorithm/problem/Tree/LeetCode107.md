```java
class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
    	int depth = findDepth(root);
    	List<List<Integer>> ans = new LinkedList<>();
    	for(int i=0;i<depth;i++) {
    		ans.add(new LinkedList<>());
    	}
    	getAns(root,depth-1,ans);
    	return ans;
    }
    public void getAns(TreeNode root , int level,List<List<Integer>> ans) {
    	if(level<0||root==null) {
    		return ;
    	}
    	ans.get(level).add(root.val);
    	getAns(root.left,level-1,ans);
    	getAns(root.right,level-1,ans);
    	
    }
    public int findDepth(TreeNode root) {
    	int depth=0;
    	if(root==null) {
    		return 0;
    	}
    	depth = Math.max(depth, 1+findDepth(root.left));
    	depth = Math.max(depth, 1+findDepth(root.right));
    	return depth;
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
https://leetcode.com/problems/binary-tree-level-order-traversal-ii/
# 풀이

문제는 모든 트리의 요소를 출력하되, 단 최하층에서 오른쪽으로 레벨별로 출력을 하라는 문제이다.

우선 나는 트리의 가장긴 depth를 알아낸후

depth별로 값을 집어넣는 getAns 함수를 만들었다.

getAns 함수는 dfs로 탐색하면서 depth별로 값을 집어넣는다.