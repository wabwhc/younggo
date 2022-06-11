/* 자주하는 질문 */
document.querySelector('.lesson_title').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#lesson').style.display = 'block';
    document.querySelector('#study').style.display = 'none';
    document.querySelector('#account').style.display = 'none';
    document.querySelector('.lesson_title').style.background = 'rgb(228, 228, 228)';
    document.querySelector('.study_title').style.background = '#fff';
    document.querySelector('.account_title').style.background = '#fff';
});
document.querySelector('.study_title').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#study').style.display = 'block';
    document.querySelector('#lesson').style.display = 'none';
    document.querySelector('#account').style.display = 'none';
    document.querySelector('.lesson_title').style.background = '#fff';
    document.querySelector('.study_title').style.background = 'rgb(228, 228, 228)';
    document.querySelector('.account_title').style.background = '#fff';
});
document.querySelector('.account_title').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#account').style.display = 'block';
    document.querySelector('#lesson').style.display = 'none';
    document.querySelector('#study').style.display = 'none';
    document.querySelector('.lesson_title').style.background = '#fff';
    document.querySelector('.study_title').style.background = '#fff';
    document.querySelector('.account_title').style.background = 'rgb(228, 228, 228)';
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
    try {
        if(isZoo) {
            if(!document.querySelector("#qna_content .qna_write_title").value){
                e.preventDefault();
                return alert("질문 제목을 입력하세요.");
            }
            if(!document.querySelector("#qna_content .qna_wirte_content").value){
                e.preventDefault();
                return alert("질문 내용을 입력하세요.");
            }
        } else {
            return alert("로그인을 해주세요.")
        }
    } catch (err) {
        console.error(err);
    }
});
/* end */

/* 질문 목록 */
let c_page = 0;

const writePage = async () => {
    try {
        let ul = document.querySelector('#table_page');
        ul.innerHTML = '';
        let li = document.createElement('li');
        li.id = 'page_back';
        li.textContent = '<이전';
        li.addEventListener('click', async (e) => {
            try {
                if(c_page > 0) {
                    c_page -= 1;
                    console.log(c_page);
                    writePage();
                    let qna_page = c_page * 10 + 1;
                    let result = await axios.get(`api/board/click?qna_page=${qna_page}`);
                    let articles = result.data.apiResult;
                    writeTitle(articles);
                }
            } catch (err) {
                console.error(err);
            }
            
        });
        ul.appendChild(li);
        for(let i=1; i<=10; i++){
            if((c_page * 10) + i <= Math.ceil((page / 10))) {
                console.log(c_page * 10 + i);
                console.log(Math.ceil(page / 10));
                let li = document.createElement('li');
                li.id = `list_${i}`
                li.className = `page`;
                li.textContent = `${i + (10 * c_page)}`;
                li.addEventListener('click', async (e) => {
                    try {
                        let qna_page = e.target.textContent;
                        let result = await axios.get(`api/board/click?qna_page=${qna_page}`);
                        let articles = result.data.apiResult;
                        writeTitle(articles);
                    } catch (err) {
                        console.error(err);
                    }
                });
                ul.appendChild(li);
            }
        }
        li = document.createElement('li');
        li.id = 'page_next';
        li.textContent = '다음>';
        li.addEventListener('click', async (e) => {
            try {
                if((c_page + 1) * 100 < page) {
                    c_page += 1;
                    writePage();
                    let qna_page = c_page * 10 + 1;
                    let result = await axios.get(`api/board/click?qna_page=${qna_page}`);
                    let articles = result.data.apiResult;
                    writeTitle(articles);
                }
                
            } catch (err) {
                console.error(err);
            }
            
            
        });
        ul.appendChild(li);
    } catch (err) {
        console.error(err);
    }
    
}

const writeTitle = async (articles) => {
    try {
        let tbody = document.querySelector('#article_body');
        tbody.innerHTML = '';
        articles.map((article) => {
            /* 질문 */
            let tr = document.createElement('tr');
            tr.id = `aritcle_${article.article_id}`;
            let td = document.createElement('td');
            td.textContent = `${article.article_id}`;
            tr.appendChild(td);
            td = document.createElement('td');
            td.textContent = `${article.article_title}`;
            tr.appendChild(td);
            td = document.createElement('td');
            td.textContent = `${article.useremail}`;
            tr.appendChild(td);
            td = document.createElement('td');
            td.textContent = `${article.article_at}`;
            tr.appendChild(td);
            tbody.appendChild(tr);
            /* 질문 답변 */
            tr = document.createElement('tr');
            tr.style.height = '150px';
            tr.style.display = 'none';
            tr.id = `article_${article.article_id}_content`;
            td = document.createElement('td');
            td.textContent = `${article.category}`;
            tr.appendChild(td);
            td = document.createElement('td');
            td.colSpan = 3;
            td.textContent = `${article.article_content}`;
            tr.appendChild(td);
            tbody.appendChild(tr);
            /* 질문답 입력 */
            if(isZoo) {
                tr = document.createElement('tr');
                tr.style.height = '100px';
                tr.id = `article_${article.article_id}_input`;
                tr.style.display = 'none';
                td = document.createElement('td');
                td.colSpan = 4;
                let form = document.createElement('form');
                let input = document.createElement('input');
                input.style.float = 'left';
                input.style.height = '100px';
                input.style.width = '400px';
                input.style.marginLeft = '80px';
                input.style.textAlign = 'center';
                input.style.fontSize = '20px';
                input.placeholder = '답변 입력';
                form.action = "api/board/ans";
                form.method = "post";
                input.name = "reply_content";
                let postData = document.createElement('input');
                postData.name = "article_id"
                postData.value = 300;
                postData.style = "display:none"
                form.appendChild(postData);
                let button = document.createElement('button');
                button.type = 'submit';
                button.textContent = '입력';
                button.style.width = '50px';
                button.style.height = '40px';
                button.style.marginTop = '30px';
                form.appendChild(input);
                form.appendChild(button);
                td.appendChild(form);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
            document.querySelector(`#aritcle_${article.article_id}`).addEventListener('click', (e) => {
                if(document.querySelector(`#article_${article.article_id}_content`).style.display === 'none'){
                    document.querySelector(`#article_${article.article_id}_content`).style.display = '';
                    document.querySelector(`#article_${article.article_id}_input`).style.display = '';
                } else {
                    document.querySelector(`#article_${article.article_id}_content`).style.display = 'none';
                    document.querySelector(`#article_${article.article_id}_input`).style.display = 'none';
                }
            });
        });
    } catch (err) {
        console.error(err);
    }
}

let page;
let isZoo;
( async () => {
    try {
        page = document.querySelector('#article_qna').textContent;
        isZoo = document.querySelector('#isZoo').textContent;
        writePage();

        let qna_page = 1;
        let result = await axios.get(`api/board/click?qna_page=${qna_page}`);
        let articles = result.data.apiResult;
        writeTitle(articles);
    } catch (err) {
        console.error(err);
    }
})();