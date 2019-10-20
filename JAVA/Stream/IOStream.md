Stream : 단일 방향으로 연속적으로 흘러가는것

데이터가 단일방향으로 흘러가기 떄문에 Stream이라고 부른다.

데이터를 입력받을때는 InputStream, 데이터를 보낼 때에는 OutputStream 이라고 부른다.

java.io의 주요 클래스는 책을 볼것 인터넷에 치면 나옴

크게 byte스트림(InputStream,OutputStream)과 char(Reader,Writer) 스트림으로 나눌 수 있음.

InputStream ( read,close 메소드 가지고있음)
read로 바이트단위로 끊어 읽고, read의 매개변수에 배열을 넣어 해당 배열에 읽어오는 바이트들을 저장하는것도 가능하다.

만약 더 읽을 바이트가 없다면 -1을 리턴한다..

close선언 하면 해당 스트림을 없앤다.

OutputStream (wrtie,flush,close)

write는 스트림으로 데이터를 출력하는것이고, 매개변수로 배열을 넣으면 해당 배열에 있는 바이트들을 출력한다.
flush는 스트림 버퍼에 잔류한 값을 모두 방출하고 close는 없앤다.

Reader 클래스 (read,close)

InputStream과 같지만 바이트 단위가 아닌 문자 바이트 단위로 읽어온다.

Writer 클래스 (write,close)

OutputStream과 같지만 바이트가 아닌 문자 바이트 단위로 출력한다.
