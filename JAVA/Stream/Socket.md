java.net.ServerSocket : 연결 수락 대기
java.net.Socket  :  연결후 클라이언트와 통신.
바인딩 포트 : 클라이언트가 접속할 포트
ServerSocket 에서 .accept 하면 연결 수락가능
그후 일을 Socket에게 위임해줌. (생성하거나 위임 )

```java
ServerSocket serverSocket=new ServerSocket(5001);
or
serverSocket.bind(new InetSocketAddress(5001));
```

5001 포트로 서버 소켓 얻어옴

포트는 반드시 비어있어야함.

.accept() 를 실행하면 서버 소켓은 통신이 들어올때까지 바인딩이된다.

연결된 클라의 IP나 포트 정보를 얻고 싶다면
```java
InetSocketAddress socketAddress=(InetSocketAddress) socket.getRemoteSocketAddress(); 하면됨
```

서버소켓은 반드시 .close()를 호출하여 포트를 반환해야한다.

클라이언트가 자바로 서버에 접속하기 위해서는 Socket 객체를 통해서 접근한다.

```java
Socket socket=new Socket("들어갈 ip","port");
```

소켓 생성후 .connet()를 통해서 통신한다.
.connect() 메소드가 실행되면 서버와 연결될떄까지 블로킹이 일어난다.