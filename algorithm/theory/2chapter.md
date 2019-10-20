모든 부분 집합 생성기
```cpp
void search(int k){
    if(k==n+1)
        //부분집합 처리
    }else{
        //부분집합에 넣는다.
        subset.push_back(k);
        search(k+1);
        //부분집합에 넣지 않는다.
        subset.pop_back();
        search(k+1);
    }
}
```

이 함수는 수 k를 부분집합에 넣을지 안넣을지를 결정한다.
2^n개의 경우의 수가 나오며 모든 수에 대한 경우를 만들기 때문에 성공적으로 모든 부분 집합을 만들 수 있다.

순열 생성기

```cpp
#include<vector>
using namespace std;
vector<int> permutation;

int main(){
    int n=10;
    for(int i=1;i<=n;i++){
        permutation.push_back(i);
    }

    do{

    }while(next_permutation(permutation.begin(),permutation.end()));
}
```

백트래킹 ( 비어 있는 해로 탐색 시작, 단계 마다 해를 확장.) 이미 알고있는 내용임으로 생략!
