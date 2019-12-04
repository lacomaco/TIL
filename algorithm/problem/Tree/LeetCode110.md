# https://leetcode.com/problems/balanced-binary-tree/

```java
class Solution {
	public boolean isBalanced(TreeNode root) {
        if(root==null){
            return true;
        }
		boolean ans = false;
		int left_depth  = findDepth(root.left);
		int right_depth = findDepth(root.right);
		if(Math.abs(left_depth-right_depth)>=2) {
			ans = false;
		}else {
			ans = isBalanced(root.left);
			ans = ans ? isBalanced(root.right) : ans;
		}
		return ans;
	}
	
	public int findDepth(TreeNode root) {
		if(root == null) {
			return 0;
		}
		int depth=0;
		depth = Math.max(depth, 1+findDepth(root.left));
		depth = Math.max(depth, 1+findDepth(root.right));
		return depth;
	}
}
```

# 풀이법 

Balanced Tree인지 아닌지 확인하는 방법은 다음과 같다.
왼쪽 서브트리와 오른쪽 서브트리의 깊이를 확인하면 된다.
루트 노드만의 깊이를 확인하는것이 아닌 전체 노드 트리의 깊이를 확인해야 하기 때문에 위와같이 짰다.
# 업그레이드 기법

```java
class Solution {
	public boolean isBalanced(TreeNode root) {
        if(root==null){
            return true;
        }
        
		boolean ans = false;
        ans = isBalanced(root.left);
		ans = ans ? isBalanced(root.right) : ans;
        
        if(!ans)
            return ans;
		int left_depth  = findDepth(root.left);
		int right_depth = findDepth(root.right);
        
		if(Math.abs(left_depth-right_depth)>=2) {
			ans = false;
		}else {
			ans = true;
		}
		return ans;
	}
	
	public int findDepth(TreeNode root) {
		if(root == null) {
			return 0;
		}
		int depth=0;
		depth = Math.max(depth, 1+findDepth(root.left));
		depth = Math.max(depth, 1+findDepth(root.right));
		return depth;
	}
}
```

재귀를 밖으로 꺼내 depth로 찾기전에 먼저 양쪽 트리가 balanced 트리인지 찾는다.

balanced트리가 아니라면 위의 부모노드 전부 balanced 트리가 아님으로 위의 코드가 성립한다.