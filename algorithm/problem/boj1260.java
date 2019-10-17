import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
	public static ArrayList<ArrayList<Integer>> map=new ArrayList<>();
	public static int[] mark;
	public static void main(String[] args) throws IOException {
		BufferedReader bf=new BufferedReader(new InputStreamReader(System.in));
		int N,M,V;
		String[] temp=bf.readLine().split(" ");
		N=Integer.valueOf(temp[0]);
		M=Integer.valueOf(temp[1]);
		V=Integer.valueOf(temp[2]);
		for(int i=0;i<=N;i++) {
			map.add(new ArrayList<Integer>());
		}
		mark=new int[N+1];
		for(int i=0;i<M;i++) {
			int a,b;
			String[] temp2=bf.readLine().split(" ");
			a=Integer.valueOf(temp2[0]);
			b=Integer.valueOf(temp2[1]);
			map.get(a).add(b);
			map.get(b).add(a);
		}
		
		for(int i=0;i<=N;i++) {
			Collections.sort(map.get(i));
		}
		dfs(V,N);
		System.out.println();
		Arrays.fill(mark, 0);
		bfs(V,N);
	}
	
	public static void dfs(int v,int N) {
		if(mark[v]==1)
			return ;
		System.out.print(v+" ");
		mark[v]=1;
		ArrayList<Integer> temp = map.get(v);
		for(int i=0;i<temp.size();i++) {
			int ti=temp.get(i);
			if(mark[ti]==0) {
				dfs(ti,N);
			}
		}
	}
	
	public static void bfs(int v,int N) {
		Queue<Integer> q=new LinkedList<>();
		mark[v]=1;
		q.add(v);
		while(!q.isEmpty()) {
			int first=q.poll();
			System.out.print(first+" ");
			ArrayList<Integer> AT=map.get(first);
			for(int i=0;i<AT.size();i++) {
				int number=AT.get(i);
				if(mark[number]==0) {
					mark[number]=1;
					q.add(number);
				}
			}
		}
	}
}