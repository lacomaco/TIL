스프링 부트에 DB연결을 하는 2가지 절차를 거쳐야한다ㅏ.
1. application.properties를 이용하여 데이터소스 설정
2. 기존 자바 스프링처럼 @Bean 어노테이션을 이용하여 데이터 소스 설정.

application.properties 방식이 더 깔끔하고 보기 좋은것같다.

방법 

1. 스프링 프로젝트의 src/main/resources 폴더에 application.properties 파일을 만든다.
```properties
spring.datasource.hikari.driver-class-name=com.mysql.cj.jdbc.Drvier
spring.datasource.hikari.jdbc-url=jdbc:mysql://localhost:3306/insight?useUnicode=true&characterEncoding=utf-8
spring.datasource.hikari.username=아이디
spring.datasource.hikari.password=비밀번호
spring.datasource.hikari.connection-test-query=SELECT 1
```

히카리 cp (connection pool) 

properties 설정이 끝났으니 이제 DB와 연결한 datasource 객체를 빈으로 만들어 올려야한다.

@Configuration 객체에 설정을 해야한다.
properties 파일을 읽으려면 @PropertySource 애노테이션 설정도 추가로 해줘야한다.

```java
@Configuration
@PropertySource("classpath:/application.properties") //application.properties를 읽을 수 있도록 path를 지정. 2개이상 설정도 가능
public class DatabaseConfiguration {
	@Bean
	@ConfigurationProperties(prefix="spring.datasource.hikari")
    //HikariConfig를 위한 설정. ConfigurationProperties 애노테이션을 지정하면 hikari가 자동으로 자신이 필요한 설정을 읽어 설정을 완료한다.
	public HikariConfig hikariConfig() {
		return new HikariConfig();
	}
	
	@Bean
    //DataSource 설정. 우리는 hikariConfig를 쓰므로 HikariDataSource로 넣는다.
	public DataSource dataSource() throws Exception{
		DataSource dataSource = new HikariDataSource(hikariConfig());
		System.out.println(dataSource.toString());
		return dataSource;
	}
}
```
properties 폴더와
프로퍼티스 폴더에서 설정으로 넣을 prefix만 지정해줘도 스프링부트에서 알아서 값을 넣은 설정 클래스를 만들어준다.

# 마이바티스 연동하는법.

마이바티스는 SQL Mapper임.

마이바티스 설정도 @Configuration 클래스에서 설정해주면됨.

```java
@Configuration
@PropertySource("classpath:/application.properties")
public class DatabaseConfiguration {
    //ApplicationContext는 뭐지.
	@Autowired
	private ApplicationContext applicationContext;
	
	@Bean
	@ConfigurationProperties(prefix="spring.datasource.hikari")
	public HikariConfig hikariConfig() {
		return new HikariConfig();
	}
	
	@Bean
	public DataSource dataSource() throws Exception{
		DataSource dataSource = new HikariDataSource(hikariConfig());
		System.out.println(dataSource.toString());
		return dataSource;
	}
    //아래가 새로 추가된것들.
	@Bean
    //SqlSessionFactoryBean은 SqlSessionFactory 생성을 위한 객체.
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception{
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        //SqlSessionFactoryf를 만든다.
		sqlSessionFactoryBean.setDataSource(dataSource);
        //지정주소의 sqlMapper (xml) 을 주입한다. SQL mapper는 xml파일이다. applicationContext.getResource로 해당 xml파일을 가져와 주입시킵니다. 
        //매퍼파일이 여러개라면 * _ 등을 이용해서 처리합니다. 이경우엔 resource의 mapper 폴더에 있는 모든 폴더에서 sql- 로 시작하는 xml을
        //매퍼 파일로 간주하여 전부 가져옵니다.
		sqlSessionFactoryBean.setMapperLocations(applicationContext.getResource("classpath:/mapper/**/sql-*.xml"));
		sqlSessionFactoryBean.setConfiguration(mybatisConfig());
		return sqlSessionFactoryBean.getObject();
	}
	
	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
		return new SqlSessionTemplate(sqlSessionFactory);
	}

	@Bean 
	//propertis 설정 추가. 마이바티스
	@ConfigurationProperties(prefix="mybatis.configuration")
	public org.apache.ibatis.session.Configuration mybatisConfig(){
		//마이바티스 설정 넣어줌.
		return new org.apache.ibatis.session.Configuration();
	}
}
```

파일 처리를 위한 Bean 설정

1. 아파치 Common Fileupload 이용한 CommonMultipartResolver
2. 서블릿 3.0 이상의 StandardServletMultipartResolver

commons-io

commons-fileupload 그레들이나 메이븐에 설치해야함

```java
@Bean
public CommonMultipartResolver multipartResolver(){
	CommonsMultipartResolver commonsMultipartResolver=new CommonsMultipartResolver();
	commonsMultipartResolver.setDefaultEncoding("UTF-8");
	commonsMultipartResolver.setMaxUploadSizePerFiles(5*1024*1024); //업로드 되는 파일 크기 ( 5mb)

	return commonsMultipartResolver;
}

```
@SpringBootApplication(exclide={MultipartAutoConfiguration.class})

설정.

파일은 <input type="file" multiple="multiple"> 로 보내느것이 가능. <form enctype="mulitpart/form-data"> 여야만함.

