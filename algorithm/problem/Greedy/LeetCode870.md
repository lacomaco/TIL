# LeetCode870
https://leetcode.com/problems/advantage-shuffle/

# 소스코드
```java
class Solution {
	/* 
	 * 조건 1. A,B의 크기는 같다.
	 * 조건 2. A는 A[i]>B[i]를 만족하는 i의 갯수가 B보다 많다.
	 * 
	 * A[i]>B[i]를 최대로 만족하는 순열을 만들어라.
	 * 
	 * A순열을 만드는 것이니 B는 움직이면 안된다.
	 * 
	 * 어떻게 할까 어떻게 해야 만족할까?
	 * 
	 * 1. 우선 B를 
	 * 
	*/
    public int[] advantageCount(int[] A,int[] B) {
    	int ans[] = new int[A.length];
    	int mark[] = new int[A.length];
    	Arrays.fill(mark, 0);
    	
    	Map<Integer,Queue<Integer>> map = new HashMap<>(); // key = value , B[i] = i,
    	
    	for(int i=0;i<B.length;i++) {
    		if(map.get(B[i])==null) {
    			map.put(B[i], new LinkedList<>());
    		}
    		map.get(B[i]).add(i);
    	}
    	
    	Arrays.sort(A);
    	Arrays.sort(B);
    	
    	int current = 0;
    	int maximum=0;
    	int minimum=0;
    	
    	for(int i=0;i<A.length;i++) {
    		boolean flag=true;
    		
    		for(int j=maximum;j<A.length;j++) {
    			if(mark[j]!=0) {
    				continue;
    			}
    			
    			if(A[j]>B[i]) {
    				ans[map.get(B[i]).poll()]=A[j];
    				mark[j]=1;
    				flag=false;
    				maximum=j;
    				break;
    			}
    		}
    		
    		if(!flag)
    			continue;
    		
    		for(int j=minimum;j<A.length;j++) {
    			if(mark[j]!=0) {
    				continue;
    			}
    			mark[j]=1;
    			ans[map.get(B[i]).poll()]=A[j];
    			minimum=j;
    			break;
    		}
    	}
    	return ans;
    }
}
```

# 접근 방법

1. 문제에서 요구하는 정답은 , B배열에 일치하는 A배열의 순열이다. 즉 A배열은 움직일 수 있어도 B배열은 움직여서는 안된다.
따라서 해쉬맵을 이용해서 B배열의 key-value값으로 저장해뒀다. 왜 이런식으로 했냐면 B배열을 소팅해야만 문제를 해결할 수 있기 떄문이다. 
어찌돼었든 B배열을 소팅하면 , B배열의 배치가 깨지기 때문에 이를 복구하기 위해서 HashMap을 이용했다.

여기서 B배열의 값이 중복되는 문제가 발생할수도 있어서 HashMap에 큐를 넣어, 값들은 큐에넣어 중복되는 값을 사용할 수 있도록 하였다.

2. A카드와 B카드를 전부 소팅해야한다. 방법은 그리드하게 A[j]>B[i]를 만족하는 카드가 나오면 그 카드를 쓰고 마킹한다.
ans에 넣기전에 미리 저장된 B 위치를 꺼내서 올바른 위치에 저장한다.

만약 A[j]>B[i]를 만족하지 않는다면 쓰지 못한 쓰레기 카드 (minimum)을 아무거나 가져와서 쓰고 마킹한다.

3. 그렇게 되면 우리가 원하는 순열을 찾을 수 있다. 순열을 리턴하면 된다.