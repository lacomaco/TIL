import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
	//노드의 수는 100개 ,
	//처음에 전위순회한 결과, 중위순회한 결과가 주어진다.
	//이를 바탕으로 후위순회한 결과를출력하라.
	public static int[] preOrder=new int[101];
	public static int[] inOrder=new int[101];
	/*
	 * 전위순회의 경우 , 루트(방문) 왼쪽 오른쪽 순으로 순회한다.
	 * 중위순회의 경우 , 루트 왼쪽(방문) 오른쪽 순으로 순회한다.
	 * 후위순회의 경우 , 루트 왼쪽 으론쪽(방문) 순으로 순회한다.
	 * 
	 * 전위순회 배열의 가장 첫번째가 루트 노드일것이다.
	 * 중위순회에서는 전위순회에서 방문한 노드의 기준으로 왼쪽트리와 오른쪽 트리를 구할 수 있다.
	 * 전위순회는 루트 왼쪽 오른쪽 순으로 나열되어있기 때문에 크기순으로 잘라서나열하면된다.
	 * 
	 * 알고리즘
	 * 1. 전위순회에서 가장 앞쪽의 루트를 찾는다.
	 * 2. 중위순회에서 해당 루트의 위치를 찾는다. (여기서 왼쪽크기와 오른쪽 크기를 찾는다)
	 * 3. 전위순회에서 왼쪽크기, 오른쪽 크기를 찾는다.
	 * 4. 우리의 목표는 후위순회이므로 왼쪽 오른쪽 방문 순으로 돈다
	 * 종료조건 : 
	 * 1. 배열이 null이거나 0이면 종료시킨다.
	 */
	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
		int C=Integer.parseInt(bf.readLine());
		for(int c=0;c<C;c++) {
			Arrays.fill(preOrder, 0);
			Arrays.fill(inOrder, 0);
			int N=Integer.parseInt(bf.readLine());
			String [] preorder=bf.readLine().split(" ");
			String [] inorder=bf.readLine().split(" ");
			for(int i=0;i<N;i++) {
				preOrder[i]=Integer.parseInt(preorder[i]);
				inOrder[i]=Integer.parseInt(inorder[i]);
			}
			find(0,0,N);
		}
		
	}
	
	//start <= index < end
	public static void find(int pre_s,int in_s,int length) {
		if(length==0)
			return ;
		
		int in=0;
		int L=0;
		int R=0;
		
		int root=preOrder[pre_s];
		
		for(int i=0;i<length;i++) {
			if(inOrder[in_s+i]==root) {
				in=in_s+i;
				R=length-L-1;
				break;
			}
			L++;
		}
		
		find(pre_s+1,in_s,L);
		find(pre_s+L+1,in+1,R);
		System.out.print(preOrder[pre_s]+" ");
	}
}
