```java
class Solution {
    public int maxDepth(TreeNode root) {
        int depth = 0;
        if(root == null) {
        	return 0;
        }
        depth = Math.max(depth, 1+maxDepth(root.left));
        depth = Math.max(depth, 1+maxDepth(root.right));
        return depth;
    }
}
```

# 풀이
단순 트리의 depth찾는 문제.

왼쪽 오른쪽으로 depth를 탐색하면서 가장 큰 depth를 선택하면된다.