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
		int N,M;
		String [] temp=bf.readLine().split(" ");
		N=Integer.valueOf(temp[0]);
		M=Integer.valueOf(temp[1]);
		for(int i=0;i<=N;i++) {
			map.add(new ArrayList<Integer>());
		}
		mark=new int[N+1];
		for(int i=0;i<M;i++) {
			String[] temp2=bf.readLine().split(" ");
			int u,v;
			u=Integer.valueOf(temp2[0]);
			v=Integer.valueOf(temp2[1]);
			map.get(u).add(v);
			map.get(v).add(u);
		}
		int ans=0;
		for(int i=1;i<=N;i++) {
			if(dfs(i,N))
				ans++;
		}
		
		System.out.println(ans);
	}
	
	public static boolean dfs(int v,int N) {
		if(mark[v]==1)
			return false;
		mark[v]=1;
		ArrayList<Integer> temp=map.get(v);
		for(int i=0;i<temp.size();i++) {
			int ti=temp.get(i);
			if(mark[ti]==0)
				dfs(ti,N);
		}
		return true;
	}
	
}