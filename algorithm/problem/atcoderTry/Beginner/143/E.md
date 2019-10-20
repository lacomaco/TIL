K리필이 필요한 경로는 K+1개의 부분 경로의 조합으로 볼 수 있다.
이 K+1개의 부분 경로는 각각 full-tank로 시작했을 경우 당연하게도 충전이 필요 없이 목적지까지 바로 도착할 수 있다.

이 문제의 목표는 S도시와 T도시로 가는데 필요한 최소 연료 충전을 구하는것이 목표이다.

위에서 말한 설명을 2개로 쪼갠다면 하나는 , full-tank에서 바로 다음 목적지까지 갈 수 있는 경로들과

그 경로들을 조합해서 목적지까지 가는 최소 합을 구하면 된다.

2가지 플로이드 알고리즘을 조합해서 해결했다.

첫번째 플로이드에서 모든 연료가 필요한 경우를 구한후, full-tank L보다 작은 것은 모두 1로 ( 한번에 갈 수 있는 우리가 원하는 경로이기 때문에) 나머지는 무한대로 처리했다.

두번째 플로이드에서 1이 나온 경로들의 조합으로 모든 경우의 최소 목적지 경로를 구했다.



```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class Main{
    
    static final int MAX = (int)1e9+1;

    public static int[][] maps=new int[301][301];
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n,m,l,a,b,c,q,s,t;
        n=sc.nextInt();
        m=sc.nextInt();
        l=sc.nextInt();
        for(int i=0;i<n;i++) {
        	for(int j=0;j<n;j++) {
        		maps[i][j]=MAX;
        	}
        }
        for(int i=0;i<n;i++) {
        	maps[i][i]=0;
        }
        for(int i=0;i<m;i++) {
        	a=sc.nextInt()-1;
        	b=sc.nextInt()-1;
        	c=sc.nextInt();
        	maps[a][b]=c;
        	maps[b][a]=c;
        }
        
        //첫번째 floyd
        for(int i=0;i<n;i++) {
        	for(int j=0;j<n;j++) {
        		for(int k=0;k<n;k++) {
        			int sum=maps[j][i]+maps[i][k];
        			maps[j][k]=Math.min(sum, maps[j][k]);
        		}
        	}
        }
        
        //걸러낸다 !
        for(int i=0;i<n;i++) {
        	for(int j=0;j<n;j++) {
        		if(maps[i][j]<=l)
        			maps[i][j]=1;
        		else
        			maps[i][j]=MAX;
        	}
        }
        
        //다시한번 floyd
        for(int i=0;i<n;i++) {
        	for(int j=0;j<n;j++) {
        		for(int k=0;k<n;k++) {
        			int sum=maps[j][i]+maps[i][k];
        			maps[j][k]=Math.min(sum, maps[j][k]);
        		}
        	}
        }
        
        
        q=sc.nextInt();
        for(int i=0;i<q;i++) {
        	s=sc.nextInt()-1;
        	t=sc.nextInt()-1;
        	int ans=maps[s][t];
        	if(ans==MAX)
        		System.out.println(-1);
        	else
        		System.out.println(ans-1);
        }
        
    }
}


```