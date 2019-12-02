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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        boolean flag = find(p,q);
    	return flag;
    }
    
        public boolean find(TreeNode p,TreeNode q) {
    	if(p==null&&q==null) {
    		return true;
    	}
    	if(p==null||q==null) {
    		return false;
    	}
    	
    	boolean flag = p.val == q.val;
    	
    	if(!flag) {
    		return flag;
    	}
    	
    	flag = flag ? find(p.left,q.left) : flag;
    	flag = flag ? find(p.right,q.right) : flag;
    	
    	return flag;
    }
}
```

# 풀이법 
p,q 를 똑같이 순회하면서 값이 다르면 false를,  값이 같다면 true를 리턴하도록 추적한다.

모든 리프노드는 null이기 때문에 , 리프토드가 같을떄까지 내려가서 추적하면된다.