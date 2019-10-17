import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
	public static ArrayList<ArrayList<Integer>> map;
	public static int[] mark=new int[20001];
	public static void main(String[] args) throws IOException {
		BufferedReader bf=new BufferedReader(new InputStreamReader(System.in));
		int K;
		String temp=bf.readLine();
		K=Integer.valueOf(temp);
		for(int k=0;k<K;k++) {
			map=new ArrayList<>();
			Arrays.fill(mark,0);
			int V,E;
			String[] temp2=bf.readLine().split(" ");
			V=Integer.valueOf(temp2[0]);
			E=Integer.valueOf(temp2[1]);
			for(int i=0;i<=V;i++) {
				map.add(new ArrayList<Integer>());
			}
			
			for(int i=0;i<E;i++) {
				int a,b;
				String[] temp3=bf.readLine().split(" ");
				a=Integer.valueOf(temp3[0]);
				b=Integer.valueOf(temp3[1]);
				map.get(a).add(b);
				map.get(b).add(a);
			}
			boolean flag=true;
			for(int i=1;i<=V;i++) {
				if(mark[i]==0) {
					mark[i]=1;
					flag=dfs(i,V,1);
					if(!flag) {
						System.out.println("NO");
						break;
					}
				}
			}
			if(flag)
				System.out.println("YES");
		}
	}
	
	public static boolean dfs(int C,int V,int now) {
		boolean flag=true;
		
		int next=now%2+1;
		
		mark[C]=now;
		ArrayList<Integer> temp=map.get(C);
		for(int i=0;i<temp.size();i++) {
			int number=temp.get(i);
			if(mark[number]==now)
				return false;
			if(mark[number]==0) {
				flag=dfs(number,V,next);
				if(!flag)
					return false;
			}
			
		}
		
		return flag;
	}
}