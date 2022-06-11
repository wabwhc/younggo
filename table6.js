const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pmss951623',
    database: 'dbtest'
})

//--------------------------- insert 유저
for(let i = 1; i <= 10; i++){
    sql = `insert into users (useremail, password, username, usercode, usercomment, phonenum) values ('test${i}@naver.com', 'test', '이름', 0, '더미데이터에요', '010-0100-0000')`
    conn.query(sql, ()=>{});  
}
for(let i = 1; i <= 5; i++){
    sql = `insert into users (useremail, password, username, usercode, usercomment, phonenum) values ('apply${i}@naver.com', 'test', '이름', 'zoo', '더미데이터에요', '010-0100-0000')`
    conn.query(sql, ()=>{});  
}
//--------------------------- insert 과목
let sub = ['자바', '자바스크립트', '파이썬', '루비', '일본어']
for(let i = 0; i < 5; i++){
    sql = `insert into subjects values ('${sub[i]}')`
    conn.query(sql, ()=>{});    
}
//--------------------------- insert 레슨 스터디
for(let i = 0; i < 5; i++){
    sql = `insert into lessons (useremail, subject, lesson_name, lesson_comment, lesson_count) values ('test${i + 1}@naver.com', '${sub[i]}', '${sub[i]}강의','${sub[i]}수업이에요', ${i + 2})`
    conn.query(sql, ()=>{});    
}

for(let i = 0; i < 5; i++){
    sql = `insert into studys (useremail, subject, study_name, study_comment, study_count) values ('test${i+6}@naver.com', '${sub[i]}', '${sub[i]}스터디','${sub[i]}스터디이에요', ${i + 2})`
    conn.query(sql, ()=>{});    
}

//--------------------------- insert 신청 레슨 스터디
for(let i = 1; i <=5 ; i++){
    sql = `insert into apply_lesson (lesson_id, useremail) values (${i}, 'apply${i}@naver.com')`
    conn.query(sql, ()=>{});
}
for(let i = 1; i <=5 ; i++){
    sql = `insert into apply_study (study_id, useremail) values (${i}, 'apply${i}@naver.com')`
    conn.query(sql, ()=>{});
}


//--------------------------- insert QnQ reply

for(let i = 1; i <=1000 ; i++){
    sql = `insert into articles (useremail, article_content, category, article_title) values ('test${parseInt(i/110)+1}@naver.com', '테스트용 질문들 카테고리${i}', '계정', '더미질문제목${i}')`
    conn.query(sql, ()=>{});
}
for(let i = 4; i <=1000 ; i++){
    sql = `insert into articles (useremail, article_content, category, article_title) values ('test${parseInt(i/110)+1}@naver.com', '레슨레슨레슨레슨레슨레슨레슨레슨${i}', '레슨', '더미질문제목${i}')`
    conn.query(sql, ()=>{});
}
for(let i = 6; i <=1000 ; i++){
    sql = `insert into articles (useremail, article_content, category, article_title) values ('test${parseInt(i/110)+1}@naver.com', '스터디스터디스터디스터디스터디스터디스터디${i}', '스터디', '더미질문제목${i}')`
    conn.query(sql, ()=>{});
}

for(let i  = 1; i <= 5; i++){
    sql = `insert into replys (useremail, reply_title, reply_content, article_id) values ('apply${i}@naver.com', '테스트용 대답들${i}', '테스트용 대답들${i}', ${i})`
    conn.query(sql, ()=>{});
}

sql = "insert into wells (well_title, well_reply, well_category) values ('레슨은 어떤 서비스인가요?','레슨하는 거임','레슨')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('레슨은 누구나 개설할 수 있나요?','아마도','레슨')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('레슨 개설에 인원제한 등이 있나요?','생성자가 지정간으함','레슨')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('레슨 가입은 누구나 할 숭 있나요?','ㅇㅇ','레슨')"
conn.query(sql, ()=>{})


sql = "insert into wells (well_title, well_reply, well_category) values ('스터디은 어떤 서비스인가요?','스터디하는 거임','스터디')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('스터디은 누구나 개설할 수 있나요?','아마도','스터디')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('스터디 개설에 인원제한 등이 있나요?','생성자가 지정간으함','스터디')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('스터디 가입은 누구나 할 숭 있나요?','ㅇㅇ','스터디')"
conn.query(sql, ()=>{})




sql = "insert into wells (well_title, well_reply, well_category) values ('개인정보 수정은 어떻게 하나요?','프로필로 가면될듯','계정')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('아이디와 비밀번호를 잊어버렸는데 어떻게 하나요?','못씀','계정')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('회원탈퇴는 어떻게 하나요?','탈퇴하지마','계정')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('개인정보 보관기간은 언제까지인가요?','모름','계정')"
conn.query(sql, ()=>{})