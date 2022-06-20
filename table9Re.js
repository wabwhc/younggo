const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gktkdals44.',
    database: 'younggo'
})

for (let i = 1; i <= 10; i++) {
    sql = `insert into users (useremail, password, username, usercode, usercomment, phonenum, userimg) values ('test${i}@naver.com', '$2b$12$xO98mGK3a5EPsT7gZdfSderifgeztilK3GQ2Zqh7RO70ZQ1rg3Ug6', '이름', 0, '더미데이터에요', '01001000000', 'default.png')`
    conn.query(sql, () => {
    });
}
for (let i = 1; i <= 5; i++) {
    sql = `insert into users (useremail, password, username, usercode, usercomment, phonenum, userimg) values ('apply${i}@naver.com', '$2b$12$xO98mGK3a5EPsT7gZdfSderifgeztilK3GQ2Zqh7RO70ZQ1rg3Ug6', '이름', 'zoo', '더미데이터에요', '01001000000', 'default.png')`
    conn.query(sql, () => {
    });
}
//--------------------------- insert 유저
//for(let i = 1; i <= 10; i++){
//    sql = `insert into users (useremail, password, username, usercode, usercomment, phonenum, userimg) values ('test${i}@naver.com', 'test', '이름', 0, '더미데이터에요', '010-0100-0000', 'default.png')`
//    conn.query(sql, ()=>{});  
//}
//for(let i = 1; i <= 5; i++){
//    sql = `insert into users (useremail, password, username, usercode, usercomment, phonenum, userimg) values ('apply${i}@naver.com', 'test', '이름', 'zoo', '더미데이터에요', '010-0100-0000', 'default.png')`
//    conn.query(sql, ()=>{});  
//}

sql = `insert into users (useremail, password, username, usercode, usercomment, phonenum, userimg) values ('default', '$2b$12$xO98mGK3a5EPsT7gZdfSderifgeztilK3GQ2Zqh7RO70ZQ1rg3Ug6', '답변 대기중', 'zoo', '답변 대기중', '01001000000', 'default.png')`
conn.query(sql, ()=>{});  
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

for(let i = 1; i <=70 ; i++){
    sql = `insert into articles (useremail, article_content, category, article_title) values ('test${parseInt(i/11)+1}@naver.com', '테스트용 질문들 카테고리${i}', '계정', '더미질문제목${i}')`
    conn.query(sql, ()=>{});
}
for(let i = 1; i <=70 ; i++){
    sql = `insert into articles (useremail, article_content, category, article_title) values ('test${parseInt(i/11)+1}@naver.com', '레슨레슨레슨레슨레슨레슨레슨레슨${i}', '레슨', '더미질문제목${i}')`
    conn.query(sql, ()=>{});
}
for(let i = 1; i <=70 ; i++){
    sql = `insert into articles (useremail, article_content, category, article_title) values ('test${parseInt(i/11)+1}@naver.com', '스터디스터디스터디스터디스터디스터디스터디${i}', '스터디', '더미질문제목${i}')`
    conn.query(sql, ()=>{});
}

for (let i = 1; i <= 300; i++) {
    sql = `insert into replys (useremail, reply_content, article_id) values ("default", '답변을 기다리는 중입니다.', ${i})`
    conn.query(sql, () => {
    });
}

sql = "insert into wells (well_title, well_reply, well_category) values ('레슨은 어떤 서비스인가요?','레슨은 잘하는 한명에게 배우는 서비스 입니다.','레슨')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('레슨은 누구나 개설할 수 있나요?','만드는 것은 가능합니다.','레슨')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('레슨 개설에 인원제한 등이 있나요?','개설하는 유저가  제한가능합니다.','레슨')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('레슨 가입은 누구나 할 숭 있나요?','회원가입시 모두 가입가능합니다.','레슨')"
conn.query(sql, ()=>{})


sql = "insert into wells (well_title, well_reply, well_category) values ('스터디은 어떤 서비스인가요?','스터디는 레슨과 달리 서로 정보를 공유하고 알려주며 실력을 향상시키는 모임입니다.','스터디')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('스터디은 누구나 개설할 수 있나요?','회원가입시 모두 가능합니다.','스터디')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('스터디 개설에 인원제한 등이 있나요?','개설하는 유저가  제한가능합니다.','스터디')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('스터디 가입은 누구나 할 숭 있나요?','회원가입시 모두 가입가능합니다.','스터디')"
conn.query(sql, ()=>{})




sql = "insert into wells (well_title, well_reply, well_category) values ('개인정보 수정은 어떻게 하나요?','로그인시 유저이름이 보이는 곳을 클릭하면 프로필이 나오고 수정가능합니다.','계정')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('아이디와 비밀번호를 잊어버렸는데 어떻게 하나요?','비밀번호를 찾는 서비스는 제공하지 않습니다.','계정')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('회원탈퇴는 어떻게 하나요?','회월탈퇴서비스도 제공하지 않습니다.','계정')"
conn.query(sql, ()=>{})

sql = "insert into wells (well_title, well_reply, well_category) values ('개인정보 보관기간은 언제까지인가요?','탈퇴후 6개월동안 보관됩니다.','계정')"
conn.query(sql, ()=>{})


sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '레슨은 모든 유지가 개설가능한가요?', '레슨', '레슨은 모든 유지가 개설가능한가요?')`
conn.query(sql, ()=>{});
sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '어떤 언어로 만들었나요?.', '레슨', '어떤 언어로 만들었나요?')`
conn.query(sql, ()=>{});
sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '자주 묻는 질문을 확인해주세요', '레슨', '레슨 모든 유지가 개설가능해요?')`
conn.query(sql, ()=>{});
sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '자주 묻는 질문을 확인해주세요', '스터디', '스터디는 모든 유지가 개설가능한가요?')`
conn.query(sql, ()=>{});
sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '무야호', '스터디', '무야호')`
conn.query(sql, ()=>{});
sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '와 샌즈 아시는구나', '스터디', '와 샌즈 아시는구나')`
conn.query(sql, ()=>{});
sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '질문은 어떻게 작성해요?', '계정', '질문은 어떻게 작성하나요?')`
conn.query(sql, ()=>{});
sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '후원은 어떻게 하나요?', '계정', '후원은 어떻게 하나요?')`
conn.query(sql, ()=>{});
sql = `insert into articles (useremail, article_content, category, article_title) values ('test1@naver.com', '와 사랑해요~~', '계정', '와 사랑해요~~')`
conn.query(sql, ()=>{});


sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', '자주 묻는 질문을 참고해주세요', 211)`
conn.query(sql, ()=>{});

sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', 'node  express를 이용했습니다.', 212)`
conn.query(sql, ()=>{});
sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', '자주 묻는 질문을 참고해주세요.', 213)`
conn.query(sql, ()=>{});
sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', '자주 묻는 질문을 참고해주세요.', 214)`
conn.query(sql, ()=>{});
sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', '카테고리와 관련된 질문을 해주세요.', 215)`
conn.query(sql, ()=>{});
sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', '카테고리와 관련된 질문을 해주세요.', 216)`
conn.query(sql, ()=>{});
sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', '지금처럼 작성하시면 됩니다.', 217)`
conn.query(sql, ()=>{});
sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', '후원탭을 누르면 계좌번호가 나옵니다. 감사합니다.', 218)`
conn.query(sql, ()=>{});
sql = `insert into replys (useremail, reply_content, article_id) values ('apply1@naver.com', '감사합니다.', 219)`
conn.query(sql, ()=>{});