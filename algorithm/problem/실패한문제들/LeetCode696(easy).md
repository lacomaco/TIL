# 못품
https://leetcode.com/problems/count-binary-substrings/
```java
class Solution {
    public int countBinarySubstrings(String s) {
        Stack<Character> st = new Stack<>();
        int ans = 0;
        //0
        for(int i=0;i<s.length();i++) {
        	Character c = s.charAt(i);
        	if(c=='0') {
        		st.push(c);
        	}
        	else {
        		if(st.isEmpty()) {
        			continue;
        		}else {
        			ans++;
        			st.pop();
        		}
        	}
        	
        }
        st.clear();
        //1
        for(int i=0;i<s.length();i++) {
        	Character c = s.charAt(i);
        	if(c=='1') {
        		st.push(c);
        	}else {
        		if(st.isEmpty()) {
        			continue;
        		}
        		else {
        			ans++;
        			st.pop();
        		}
        	}
        }
        
    	return ans;
    }
}
```

스택을 쓰는 문제인것 같은데 도저히 모르겠음. 스택 방법밖에 안떠오르는데 스택문제는 아님 

# 방법 1. 캐릭터들을 그룹으로 나누기 

```java
class Solution {
    public int countBinarySubstrings(String s) {
        int[] groups = new int[s.length()];
        int t = 0;
        groups[0] = 1;
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i-1) != s.charAt(i)) {
                groups[++t] = 1;
            } else {
                groups[t]++;
            }
        }

        int ans = 0;
        for (int i = 1; i <= t; i++) {
            ans += Math.min(groups[i-1], groups[i]);
        }
        return ans;
    }

```

접근법 . 

문자열 s를 groups 배열로 전환합니다. 

예를 들어 이렇게 말입니다.

string s = "110001111000000"
groups = [2,3,4,6]; 이런식으로 , 1과 0을 구분지어 그룹을 나눈다.

전체 그룹의 합의 양은 '0' * k + '1' * k 이거나 , '1' * 'k' + '0' * 'k' 이다.

여기서 k는 첫번쨰로 선택된 수의 그룹서, '0' * k + '1' * k 에서 k는 '0'의 그룹수이고, '1' * 'k' + '0' * 'k' 에서의 k는 '1'의 그룹수 일 것이다.

생각해보자. 어차피 그룹 배열의 다음 그룹은 다른수 일 것이고 우리는 현재 위치하는 그룹의 수를 가지고 싶고

현재 그룹의 수는 현재 있는 수 + 다음 그룹의 수 의 ( 최대값 , 자신의 수 ) 일 것이다.

이렇게 일렬로 나열하고 선회하면서 값을 구하면된다.


제공된 솔루션대로 구현한 코드 (성공했음)
```java
class Solution {
    public int countBinarySubstrings(String s) {
    	int ans = 0;
    	ArrayList<Integer> groups = new ArrayList<>();
    	Character current = s.charAt(0);
    	int stack = 1;
    	
    	for(int i=1;i<s.length();i++) {
    		if(s.charAt(i) != current) {
    			groups.add(stack);
    			current = s.charAt(i);
    			stack = 1;
    			
    		}else {
    			stack ++ ; 
    		}
    	}
    	
    	groups.add(stack);
    	
    	for(int i=0;i<groups.size()-1;i++) {
    		ans += Math.min(groups.get(i), groups.get(i+1));
    	}
    	
    	return ans;
    	
    	
    }
}
```

문자열 합에 관한 문제에서 조금 약한것 같음

# 방법 2. 선형 스캔으로 얻기 

```java
class Solution {
    public int countBinarySubstrings(String s) {
        int ans = 0, prev = 0, cur = 1;
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i-1) != s.charAt(i)) {
                ans += Math.min(prev, cur);
                prev = cur;
                cur = 1;
            } else {
                cur++;
            }
        }
        return ans + Math.min(prev, cur);
    }
}

```

