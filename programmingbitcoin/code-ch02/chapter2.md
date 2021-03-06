# 타원곡선의 정이
y^2 = x^3 + x^2... 처럼 , x축을 기점으로 y의 값이 여러개가 나올 수 잇는 곡선 함수.

비트코인에선 이런 타원곡선(secp256k1) 을 사용하여, 암호화를 합니다.

타원곡선을 이용하는 이유는 타원곡선은 역치하여 값을 구하는것이 불가능 하기 때문입니다.

# 두접의 덧셈

타원곡선의 두 점의 덧셈이란 , 두개의 점을 어떤 연산을 통해 타원 곡선 위의 새로운 3번째 점을 추정하는 과정입니다.

점 덧셈은 교환법칙이 성립합니다.

보통 , 타원 곡선 내에서 2개의 점을 찍어 직선으로 그린다면 ,3번째 점을 만날 수 있습니다.

하지만 예외사항이 잇는데, 두점을 이은 직선이 타원 곡선의 접선이라면 나머지 3번째 점은 구할 수 없습니다.

예외사항을 제외하면 보통은 성립이 됩니다.

# 타원 곡선 두점 덧셈 진행 방식

1. 우선 점 A 와 B를 정하고 직선을 그어서 새로운점 C가 나올때까지 진행합니다.

2. C를 찾으면 X축 대칭한 지점의 점이 A+B의 결과입니다.

이러한 방식이기 때문에 , 점 덧셈은 쉽게 예측이 불가능합니다. 직관으로 점 덧셈의 위치를 파악하는것은 어렵고 수식을 통해 계산해야만 합니다.

# 점 덧셈의 4가지 성질

1. 항등원이 존재합니다. ( 덧셈에서의 0 , 항등원과 수 A를 더하면 A가나옵니다.)

점 덧셈에서의 항등원은 , 수직으로 그었을때 나오는 점 A -A 가 항등원입니다. A + -A = A가 나오기 때문입니다.

2. 교환법칙이 성립합니다.

단순하게 생각나서 점 A에서 B로 지나는 직선이나 , B에서 A로 지나는 직선이나 어차피 동일한 직선이기 때문에 교환법칙이 성립합니다.

3. 결합법칙이 성립합니다.

4. 역원이 존재합니다.

# 점 덧셈 공식

p1+p2=p3이고

기울기는 (p1.y-p2.y) / (p1.x-p2.x) 일것이다.

여기서 p3.x ,p3.y 를 구하는 공식은

p3.x=기울기^2 -x1 -x2
p3.y=기울기*(x1-x3) - y1이다.

공식 유도는 책에 나와있다. 책을 보는게 나을듯 함.