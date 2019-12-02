```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if(root==null){
            return true;
        }
    	return find(root.left,root.right);
    }
    
    public boolean find(TreeNode left, TreeNode right) {
    	if(left==null&&right==null)
    		return true;
    	if (left==null||right==null)
    		return false;
    	if(left.val!=right.val)
    		return false;
    	
    	return find(left.left,right.right)&&find(left.right,right.left); 
    }
}
```

# https://leetcode.com/problems/symmetric-tree/submissions/

# 풀이법.

1. root 트리의 양옆 트리를 비교한다.
2. 모든 리프노드는 null임으로 리프노드까지 성공적으로 탐색하면 true를 리턴한다.
3. 양옆 트리의 root 값이 다르면 그것은 이미 mirror가 아님으로 false를 리턴한다.
4. 트리는 바이너리 트리임으로 2개의 root 트리 아래에는 4개의 노드가 존재한다. mirror를 만족할려면 left.left는 right.right와 같아야하고 , left.right 는 right.left와 일치해야한다. 이에 관한 연산은 재귀로 미룬다
