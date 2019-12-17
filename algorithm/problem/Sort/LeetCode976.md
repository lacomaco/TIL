# Largest Perimeter Triangle (EASY)

https://leetcode.com/problems/largest-perimeter-triangle/

# 소스코드

```java
class Solution {
	public int largestPerimeter(int[] A) {
		int ans = 0;
		Arrays.sort(A);
		for(int i=A.length-1;i>=2;i--) {
			int c=A[i];
			for(int j=i-1;j>=1;j--) {
				int b=A[j];
				for(int l=j-1;l>=0;l--) {
					int a=A[l];
					if(a+b>c) {
						return a+b+c;
					}
				}
			}
		}
		
		return ans;
	}
}
```

# 접근방법

중학생때 공부한 삼각형 성립 조건을 다시한번 떠올려보자.

삼각형을 이루는 a,b,c 3개의 변이 있고 이중 c가 가장 큰 삼각형이라면 

삼각형은 반드시 a+b>c 를만족해야만 성립이 가능하다.

이 문제는 배열에 주어졌을때 이중 가장 큰 삼각형 둘레를 구하는 문제이다.

문제를 푸는 순서는 다음과 같다.

1. 배열 A를 오름차순으로 정렬한다. (내림차로 해도 좋다. 나는 콜렉션 기본이 오름차순이여서 그냥 그렇게 했다.)
2. 배열 A의 뒤에서부터 임의로 c , b , a를 순차적으로 구한다.
3. 만약 a+b>c를 만족하면 리턴한다. (정렬된 순서로 구하는 것이니 이보다 큰 값이 나올 수 없다.)
4. 전체탐색후 , 나오지 않는다면 0을 리턴한다.

