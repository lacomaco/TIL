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