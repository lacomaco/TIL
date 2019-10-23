public class Main {

	static final int MAX = (int) 1e9 + 1;

	public static int[] pre = new int[101];
	public static int[] inor = new int[101];

	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
		int C = Integer.parseInt(bf.readLine());
		for (int c = 0; c < C; c++) {
			Arrays.fill(pre, 0);
			Arrays.fill(inor, 0);
			int N=Integer.parseInt(bf.readLine());
			String[] PRE = bf.readLine().split(" ");
			String[] INOR = bf.readLine().split(" ");

			for (int i = 0; i < PRE.length; i++) {
				pre[i] = Integer.parseInt(PRE[i]);
				inor[i] = Integer.parseInt(INOR[i]);
			}
			find(0,N,0,N);
			System.out.println();
		}
	}
	
	public static void find(int start,int last,int START,int LAST) {
		if(start==last)
			return;
		int root=pre[start];
		int middle=-1;
		for(int i=START;i<LAST;i++) {
			if(inor[i]==root) {
				middle=i;
				break;
			}
		}
		int left_size=middle-START;
		int right_size=LAST-middle-1;
		
		int nlis,nlil,nlps,nlpl;
		int nris,nril,nrps,nrpl;
		
		nlis=start+1;
		nlil=start+1+left_size;
		nlps=START;
		nlpl=START+left_size;
		
		nris=nlil;
		nril=last;
		nrps=middle+1;
		nrpl=LAST;
		
		find(nlis,nlil,nlps,nlpl);
		find(nris,nril,nrps,nrpl);
		System.out.print(root+" ");
	}
}