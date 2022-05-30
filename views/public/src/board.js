/* 자주하는 질문 */
document.querySelector('.lesson_title').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#lesson').style.display = 'block';
    document.querySelector('#study').style.display = 'none';
    document.querySelector('#account').style.display = 'none';
    document.querySelector('.lesson_title').style.background = '#aaa';
    document.querySelector('.study_title').style.background = '#fff';
    document.querySelector('.account_title').style.background = '#fff';
});
document.querySelector('.study_title').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#study').style.display = 'block';
    document.querySelector('#lesson').style.display = 'none';
    document.querySelector('#account').style.display = 'none';
    document.querySelector('.lesson_title').style.background = '#fff';
    document.querySelector('.study_title').style.background = '#aaa';
    document.querySelector('.account_title').style.background = '#fff';
});
document.querySelector('.account_title').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#account').style.display = 'block';
    document.querySelector('#lesson').style.display = 'none';
    document.querySelector('#study').style.display = 'none';
    document.querySelector('.lesson_title').style.background = '#fff';
    document.querySelector('.study_title').style.background = '#fff';
    document.querySelector('.account_title').style.background = '#aaa';
});
/* end */

/* 질문 등록 */
document.querySelector(".input_qna").addEventListener('click', (e) => {
    e.preventDefault();
    if(document.querySelector("#qna_content").style.display == 'block'){
        document.querySelector("#qna_content").style.display = 'none';
    }else {
        document.querySelector("#qna_content").style.display = 'block'
    }
});
document.querySelector("#qna_content button").addEventListener('click', async (e) => {
    if(!document.querySelector("#qna_content .qna_write_title").value){
        e.preventDefault();
        return alert("질문 제목을 입력하세요.");
    }
    if(!document.querySelector("#qna_content .qna_wirte_content").value){
        e.preventDefault();
        return alert("질문 내용을 입력하세요.");
    }
    try{
        
    }catch(err){
        console.error(err);
    }
});
/* end */

/* 질문 목록 */
document.querySelectorAll("#article_body tr").forEach((el) => {
    el.addEventListener('click', (e) => {
        const id = el.querySelector('td').textContent;
        console.log(id);
        getContent(id);
    })
});

const getContent = async (id) => {
    try {
        if(document.querySelector(`#article_${id}_content td`)){
            document.querySelector(`#article_${id}_content`).style.height = '0px'
            document.querySelector(`#article_${id}_content td`).remove();
            document.querySelector(`#article_${id}_content td`).remove();
        } else {
            const result = await axios.get(`/board/${id}/content`);
            const contents = result.data;
            const tr = document.querySelector(`#article_${id}_content`);
            tr.style.height = '100px';
            tr.innerHTML = '';
            console.log(contents);
            contents.map(content => {
                let td = document.createElement('td');
                td.textContent = content.article_content;
                tr.appendChild(td);
                td = document.createElement('td');
                td.colSpan = 2;
                td.textContent = content.category;
                tr.appendChild(td);
            });
            tr = document.querySelector(`article_${a.article_id}_content`);
            tr.innerHTML = '';
        }
    } catch (err) {
        console.error(err);
    }
}
/* end */

/* 테이블 페이지 */
document.querySelectorAll(".table_footer_list").forEach((el) => {
    el.addEventListener('click', (e) => {
        const id = el.querySelector('li').className;
        reText(id)
    });
});

const reText = async (id) => {
    try {
        const li = document.querySelector(`.${id}`);
        console.log(li);
    }
    catch(err) {
        console.log(err);
    }
}
/* end */

/* axios.get($) */