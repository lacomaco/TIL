import React from 'react';
import qs from 'qs';

const About = ({location})=>{
    const query = qs.parse(location.search,{
        ignoreQueryPrefix:true //이 설정을 통해 query의 ? 앞부분 생략
    });
    const showDetail = query.detail === 'true';
    return(
        <div>
            <h1>소개 페이지</h1>
            {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
        </div>
    )
};

export default About;