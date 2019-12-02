```java
class Solution {
    public int[] gardenNoAdj(int N, int[][] paths) {
        int [] ans=new int[N];
        ArrayList<Integer> [] map=new ArrayList[N];
        /*
        1. 출구는 4개이상 존재할 수 없으니, 색깔은 반드시 지정된다.
        2. 색을 결정할때에는 연결된 출구의 색을 고려해야한다.
        3. map은 출구 연관관계를 매핑한 배열이다.
        */
        for (int i=0;i<N;i++){
            map[i]=new ArrayList<Integer>();
        }
        
        for(int i=0;i<paths.length;i++){
            int from = paths[i][0]-1;
            int to = paths[i][1]-1;
            map[from].add(to);
            map[to].add(from);
        }
        int [] colors=new int[5];
        for(int i=0;i<N;i++){
            Arrays.fill(colors,0);
            ArrayList<Integer> path=map[i];
            
            for(int j=0;j<path.size();j++){
                colors[ans[path.get(j)]]=1;
            }
            
            for(int j=1;j<5;j++){
                if(colors[j]==0){
                    ans[i]=j;
                    break;
                }
            }
        }
        
        return ans;
    }
}
```
https://leetcode.com/problems/flower-planting-with-no-adjacent/

# 풀이법 

간단하게 생각해보면

각 정원의 색깔은 주변 정원의 색에 의해서 정해진다.

주변 정원의 색이 아닌 색중에서 가장 낮은 수의 색을 택하면 된다.

각 노드의 길은 4개 이상의 길을 가질 수 없다고 되어있음으로, 충분히 4가지색으로 정원을 꾸미는것이 가능하다.

# 풀이법

1. 우선 정원에 연결된 길을 모두 수집해서 새로운 배열에 넣었다. ( 왜냐하면 , 색을 정할때 필요하기 때문에 )
2. 정원 N개를 루프로 돌면서 색을 결정한다. ( 방법은 간단하다. 연결된 길에서 접근한 정원의 색을 ans에서 찾아 해당하지 않는 색을 찾는것이다.)
3. 정원의 색을 결정한다

이를 N번 돌린다.

