
//https://atcoder.jp/contests/abc143/submissions
/*
플로이드 워샬
O(N^3)으로 문제를 구할 수 있다.
1. 노드 간 거리를 저장하기 위한 행렬을 사용함.
행렬의 초기값은 그래프 인접 행렬과 같고 나머지는 값을 INFINITE로 설정한다.
행렬은 dist[i][j]가 의미하는 것은 i에서 j로 가는 현재까지 밝혀진 최단거리를 의미한다.

중간노드를 경유하는 최단거리를 행렬에 기록한다.
초기화는 생략했다.
// i가 중간 경유코드이다.
for(int i=0;i<N;i++){
    //j가 왼쪽, l이 오른쪽 코드라고 편하게 지칭하겠다.
    for(int j=0;j<N;j++){
        for(int l=0;l<N;l++){
            dist[j][l]=min(dist[j][l],dist[j][i]+dist[i][l]);
        }
    }
}
*/

/*
First, observe that any path that has 𝐾 refills can be split into 𝐾+1 paths, 
each of which can be completed (starting with a full tank of gas) without refilling.

So, we can begin by finding all pairs of cities that can be traveled between on a full tank of gas without refilling. 
To do this, we can find the shortest path between all pairs of cities (for example, using Floyd-Warshall). 
Then, we build a new adjacency matrix for these paths, where two cities with distance ≤𝐿 have an edge of cost 1, 
and two cities with distance >𝐿 have no edge (or an edge with cost ∞). 
Then we compute the shortest path between all pairs using this new adjacency matrix, 
which tells us the minimum number of segments a valid path in the original graph can be broken into.

Then, given a query (𝑠,𝑡), we simply find the distance in the new shortest-paths matrix and subtract 1, 
and we have our answer (or print −1 if it's unreachable).
We have to remember to subtract 1 because it takes 𝐾 refills for a path of 𝐾+1 segments 
(or equivalently, the first tank of gas is free).
*/

/*
K충전을 해야 갈 수 잇는 경로는, K+1개의 경로의 조합으로 분할해서 볼 수 있다.
그리고 K+1개의 각각의 경로는 full-tank 였을경우 한번에 충전없이 진행이 가능하다.

2가지 파트를 볼 수 있다.

우선 충전 없이 바로 진행이 가능한 길 (옆옆동네까지도 포함해야함)
그리고 그 경로의 조합으로 만든 최소 길

첫번째 floyd에서 모든 경로의 필요한 최소 연료를 구한다.

그 연료중 값으로 들어온 L보다 작으면 1 아니면 무한대

그리고 다시 그 조합으로 최소경로를 구한다.

다음 쿼리에 맞춰서 값을 뿌려준다,
*/
public class Main{
    
    static final int MAX = (int)1e9+1;
    
    /*
    이문제는 도시를 여행하는데,
    도시를 여행할때마다 L이라는 연료가 소모되고 각 도시를 지나갈때마다 연료를 충전할 수 있다.
    우리가 찾고자 하는것은 최소한의 연료충전으로 도시를 까지 여행할 수 있는 충전 횟수를 구하는것이 목표이다.
    Q로 여러개의 질답이 나오기 때문에 미리 행렬에 최단거리 ( L을 거리로 친다.)를 기록하는것이 더 유리하다.
    
    */
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        
        int n = Integer.parseInt(sc.next());
        int m = Integer.parseInt(sc.next());
        int l = Integer.parseInt(sc.next());
        
        int[][] dist = new int[n][n];
        for(int[] tmp : dist){
            Arrays.fill(tmp, MAX);
        }

        for(int i=0; i<n; i++){
            dist[i][i] = 0;
        }
        //플로이드 워샬을 적용한것 같음. 아래까지가 행렬 초기화인것 같다.
        
        for(int i=0; i<m; i++){
            int a = Integer.parseInt(sc.next())-1;
            int b = Integer.parseInt(sc.next())-1;
            int c = Integer.parseInt(sc.next());
            dist[a][b] = c;
            dist[b][a] = c;
        }
        
        //플로이드 워샬 실행해서 최단거리를 구했음
        for(int k=0; k<n; k++){
            for(int i=0; i<n; i++){
                for(int j=0; j<n; j++){
                    int sum = dist[i][k]+dist[k][j];
                    if(dist[i][j] > sum){
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        //하지만 이것만으로는 충분하지 않다. 길중에 만약 i에서 j로가는 길이 L보다 큰 연료를 요구한다면, 그 길은 처음부터 갈 수 없지만
        //플로이드 워샬에선 그것을 고려하지 않고 값을 구했기 때문에 문제가 생긴다.
        
        //플로이드 워샬을 돌며 건너갈 수 없는 길을 다시 체크해봄.
        for(int i=0; i<n; i++){
            for(int j=0; j<n; j++){
                if(dist[i][j] <= l){
                    dist[i][j] = 1;
                }else{
                    dist[i][j] = MAX;
                }
            }
        }
        
        //다시한번 플로이드 워샬
        for(int k=0; k<n; k++){
            for(int i=0; i<n; i++){
                for(int j=0; j<n; j++){
                    int sum = dist[i][k]+dist[k][j];
                    if(dist[i][j] > sum){
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        //플로이드를 2번 돌았다. 왜지? 저 부분에서 dist[i][j]>l이면 왜 MAX를 넣은거지?
        
        int q = Integer.parseInt(sc.next());
        for(int i=0; i<q; i++){
            int s = Integer.parseInt(sc.next())-1;
            int t = Integer.parseInt(sc.next())-1;
            if(dist[s][t] != MAX){
                System.out.println(dist[s][t]-1);
            }else{
                System.out.println(-1);
            }
        }
        
    }
}