import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class Main {
	/*
	 * 가장 성벽을 많이 넘어야 하는 두 지점을 찾아라.
	 * 루트에서 가장 긴 2 영역을 찾아 더한다.
	 */
	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
		int C =Integer.parseInt(bf.readLine());
		for(int c=0;c<C;c++) {
			String t=bf.readLine().trim();
			int N = Integer.parseInt(t);
			
			String temp[]=bf.readLine().split(" ");
			
			int a = Integer.parseInt(temp[0]);
			int b = Integer.parseInt(temp[1]);
			int r = Integer.parseInt(temp[2]);
			
			Circle root = new Circle(a,b,r);
			for(int i=1;i<N;i++) {
				temp=bf.readLine().split(" ");
				a = Integer.parseInt(temp[0]);
				b = Integer.parseInt(temp[1]);
				r = Integer.parseInt(temp[2]);
				Circle circletemp = new Circle(a,b,r);
				root.putCircle(circletemp);
			}
			
			root.findWay();
			int ans = root.ans();
			System.out.println(ans);
		}
		
	}
	
}

/*
 * 성벽이 포함되는지 안되는지 알아내는 방법
 * 1.
 */
class Circle{
	int x;
	int y;
	int r;
	int longest=-1;
	ArrayList<Circle> Childes=new ArrayList<>();
	// b in a => true
	Circle(int x,int y,int r){
		this.x=x;
		this.y=y;
		this.r=r;
	}
	
	public boolean checkInCircle(Circle a,Circle b) {
		int dSquare=(a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y);
		double d=Math.sqrt(dSquare);
		return d<Math.abs(a.r-b.r) && b.r<a.r ? true : false; 
	}
	
	public void putCircle(Circle a) {
		for(int i=0;i<Childes.size();i++) {
			if(checkInCircle(Childes.get(i),a)) {
				Childes.get(i).putCircle(a);
				return;
			}else if(checkInCircle(a,Childes.get(i))) {
				a.Childes.add(Childes.get(i));
				Childes.set(i, a);
				return ;
			}
		}
		
		Childes.add(a);
		return ;
	}
	
	public int findWay() {
		if(longest!=-1) {
			return longest;
		}
		int way =0;
		for(int i=0;i<Childes.size();i++) {
			way=Math.max(way, 1+Childes.get(i).findWay());
		}
		longest = way;
		return longest;
	}
	
	public int find2Way() {
		int first=0;
		int second=0;
		for(int i=0;i<Childes.size();i++) {
			int way = Childes.get(i).longest;
			way = way != 0 ? way + 1 : way;
			
			if(way>=first) {
				int temp=first;
				first=way;
				second=temp;
				continue;
			}
			
			if(way>second) {
				second=way;
			}
		}
		
		return first+second;
	}
	
	public int ans() {
		int ans=this.find2Way();
		for(int i=0;i<Childes.size();i++) {
			ans=Math.max(ans, Childes.get(i).ans());
		}
		return ans;
	}
}

// 결국 못품 ㅠ