스프링에 DB를 연동하는 방법.
1. JDBC
2. Spring JDBC (spring에서 제공하는 jdbcTemplate를 이용함.)
3. Transaction 관리가 쉽다! ( 어노테이션만 붙이면 되니까 ! )

우선 스프링 프로젝트에 스프링 DB를 연동하고 싶다면 DB와 연동할 커넥션을 가져와야한다.

spring-jdbc ( spring jdbc 모듈 ) , tomcat-jdbc (톰캣을 쓰니까! 커넥션풀을 제공해준다구!) , mysql-connector-java ( mysql과 연동할 통로 !)

3가지 모듈을 가져왔으면 우선 mysql과 연동할 커넥션을 뚫어줘야한다!
DataSource를 이용한다.

DataSource를 구현한 빈객체를 스프링 컨텍스트에 올리고, DB와 연동이 필요한 객체는 이 DataSource를 주입받아 활용하게 된다.

```java
@Configuration
public class DbConfig{
    //DataSource 빈 객체 선언.
    @Bean(destroyMethod="close")
    public DataSource dataSource(){
        DataSource ds = new DataSource();
        //DriverClassName 선언 , mysql 드라이버를 가져온다.
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        //연결할 dbURL을 설정한다.
        ds.setUrl("jdbc:mysql://localhost/spring5fs?characterEncoding=utf8");
        //dbUser 이름을 설정한다.
        ds.setUserName("spring");
        //비밀번호를 설정한다.
        ds.setPassword("spring");
        //initialSize 커넥션풀 초기화 사이즈,2개가 생성된다.
        ds.setInitialSize(2);
        //커넥션풀은 10개 초과 생성이 불가능하다!
        ds.setMaxActive(10);
        //유휴 커넥션 검사
        ds.setTestWhileIdle(true);
        //최소 유휴 시간 3분
        ds.setMinEvictableIdleTimeMillis(1000*60*3);//
        //유휴 커넥션을 10초주기로 검사.
        ds.setTimeBetweenEvictionRunsMillis(1000*10);
        return ds;
    }
}
```

커넥션 풀에서 나온 커넥션은 active
커넥션 풀로 들어간 커넥션은 Idle 상태!


더 자세한건 apache에서 찾아보는것이 낫겠지만 혹시 모르니 책에 있는것들을 써본다.
나중에 이걸 보면 바로 기억이 나겠지
setInitialSize(int)
setMaxActive(int)
setMaxIdle(int) 최소 유지 커낵션 개수
setMaxWait(int) 커넥션 풀에서 커넥션을 가져올때 대기할 최소 시간.
setMaxAge(long) 최초 커녁션 연결후 커녁션 유효시간
setValidationQuery(String) 커녁션이 유혀한지 검사하는 쿼리. 정기적으로 쿼리를 넣어서 유효한지 체크해준다
setValidationQueryTimeout(int) 검사 쿼리의 최대 실행시간. 시간을 넘기면 검사에 실패한것으로 간주한다.
setTestOnBorrow(boolean) 풀에서 커넥션을 가져올 때 검사 여부를 지정해준다.
setTestOnReturn(boolean) 풀에 커넥션을 반환할 때 검사 여부를 지정해준다.
setTestWhileIdle(boolean) 커넥션이 풀에서 놀때 이 커넥션이 아직 유효한지 검사해줌.
setMinEvictableIdleTimeMillis(int) 커넥션 풀에서 유휴상태로 있을 최소시간을 지정해줌.
setTimeBetweenEvictionRunsMillis(int) 유휴 커넥션의 검사 주기를 지정해줌

JDBCTemplate( Spring에서 지원해주는것 ! )

1. JDBCTemplate를 사용하기전에 편의를 위해 JdbcTemplate 객체를 만들어야한다.

```java
@Configuration
public class DbConfig{
    @Bean(destroyMethod="close")
    public DataSource dataSource(){
        DataSource ds = new DataSource();
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setUrl("jdbc:mysql://localhost/spring5fs?characterEncoding=utf8");
        ds.setUserName("spring5");
        ds.setPassword("spring5");
        ds.setInitialSize(2);
        ds.setMaxActive(10);
        return ds;
    }

    @Bean
    public MemberDao memberDao(){
        return new MemberDao(dataSource);
    }
}

class MemberDao{
    private JdbcTemplate jdbctemplate;

    public MemberDao(DataSource dataSource){
        this.jdbcTemplate=new JdbcTemplate(dataSource);
    }
}
```

MemberDao라는 클래스를 만들고. 이 클래스에 jdbcTemplate를 선언했다. jdbc는 당연히 db와 커넥션을 필요로 하기에 dataSource를 생성자 주입으로 처리하였다.

jdbcTemplate는 query메소드를 제공한다.
List<T> query(String sql,RowMapper<T> rowMapper)
List<T> query(String sql,Object[] args,RowMapper<T> rowMapper)
List<T> query(String sql,RowMapper<T> rowMapper,Object ...args);

sql은 쿼리문을 의미하고 .. RowMapper는 결과가 담길 방식을 의미하며 args에는 들어갈 값들이 온다. 예를들어

```java
List<Member> result=jdbcTemplate.query(
    "select * from Member wher email = ?",
    (ResultSet rs,int rowNum)->{
        Member member=new Member(rs.getString("EMAIL"),
        rs.getString("PASSWORD"),
        rs.getString("NAME"),
        rs.getTimestamp("REGDATE"));
        member.setId(rs.getLong("ID"));
        return member;
    },
    email);
return result;
```

이경우 select * from Member where email 이 sql이 되고
rowMapper는 (ResultSet rs,...) 인 익명함수가 된다.
args로 email이 들어가 쿼리문에 ? 에 대입된다.

rowMapper는 인터페이스를 지원함으로 재활용성을 위해서 코드를 빼내는것도 가능하다.

```java
public class RM implements RowMapper<Member>{
    @Override
    public Member mapRow(ResultSet rs,int rowNum) throws SQLException{
        .......code
    }
}

List<Member> rsult=jdbcTemplate.query("select * from member where email=?",new RM(),email);
```

query메서드의 결과가 아무것도 없다면 쿼리 는 길이가 0인 리스트를 배출한다.

그 외에도 queryForObject() 같은 여러 메서드들이 존재하지만 query만으로도 간단한건 전부 해결할 수 잇다.

queryForObject는 List가 아닌 , RowMapper가 선언한 타입이거나 , 직접 넣어준 타입으로 변환되서 나온다.

jdbcTemplate의 다른 쿼리문 (insert update delete) 는 update 메서드로 전부 조작한다.

int update(String sql);
int update(String sql,args...);

update는 쿼리 실행후 변경된 행의 갯수를 리턴한다.

PreparedStatementCreator를 이용한 쿼리실행도 가능하다. 

```java
jdbcTemplate.update(new PreparedStatementCreator(){
    @Override
    public PreparedStatement createPreparedStatement(Connection con) throws SQLException{
        PreparedStatement pstmt=con.prepareStatement("insert into Member (email,password,name,regdate) values(?,?,?,?)");
        pstmt.setString(1,member.getEmail);
        ....
        return pstmt;
    }
});
```

왜 써야하는지는 나와있지 않음 .. 

왜 이렇게 복잡하게 써야할까?

모르겠다.

int update(PreparedStatementCreator psc,KeyHolder generatedKeyHolder);
KeyHolder는 쿼리 실행후 생성된 키값을 알고싶을때 사용한다.

```java
KeyHolder keyHolder=new GeneratedHolder();
jdbcTemplate.update((Connection con)->{
    PreparedStatement pstmt=con.prepareStatement("insert into member (email,password,name,regdate) values (?,?,?,?)",
    new String[] {"ID"});
    pstmt set.....
    return pstmt;
},KeyHolder);
Number keyvalue=keyHolder.getKey();
member.setId(KeyValue.longValue());
```

keyHolder를 만들고, update 메소드의 2번째인자에 넣어준다.

PreparedStatement내부에 쿼리문을 만들때 new String[] {"ID"} 가있는데, ID가 AutoIncrement로 만들어지는 키 칼럼을 넣는것이다.
키칼럼의 값은 KeyHolder에 들어있음으로 가져와 사용하면된다.

트랜잭션

rollback ( DB를 롤백 )
commit (DB에 반영)

@Transactional 어노테이션을 활용하면 매우 쉽게 트랜잭션이 적용되는 메서드 범위를 지정할 수 있다.

그저 트랜잭션이 필요한 메서드 위에 해당 어노테이션을 부착하면 자동으로 트랜잭션으로 묶이게 된다.

```java
@Transactional
public void update(){
    ....
}
```

물론 @Transactional을 쓰고 싶으면 설정 컨피그 클래스에서 트랜잭션이 쓰인다는것을 선언해줘야한다. @EnableTransactionManagement을 설정 클래스에 올리고
PlatformTransactionManager을 빈에 등록해야한다.  DataSource를 통해 DB와 연결함으로 DataSource를 tm에 붙여줘야 작동한다.
```java
@Configuration
@Transactional
public class DbConfig{
    @Bean(destroyMethod="close")
    .....
}

@Bean
public PlatformTransactionManager transactionManager(){
    DataSourceTransactionManager tm = new DataSourceTransactionManager();
    tm.setDataSource(dataSource());
    return tm;
}
```

그후 트랜잭션이 필요한 메서드에 해당 어노테이션을 올리면 된다!

@Transaction도 마치 AOP처럼 작동하기 때문에 스프링에서 프록시 객체를 적용하여 트랜잭션을 움직인다. 이점을 기억하자

커밋과 롤백 모두 AOP처럼 스프링이 자동으로 처리한다.