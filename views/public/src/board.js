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
let c_page = 0;
const writeButton = () => {
    // let page =  Math.ceil(count / 10);
    // console.log(page);
    let ul = document.querySelector('#table_page');
    ul.innerHTML = '';
    let li = document.createElement('li');
    li.id = 'page_back';
    li.textContent = '<이전';
    li.addEventListener('click', (e) => {
        if(c_page > 0) {
            c_page -= 1;
            console.log(c_page);
        }
        writeButton();
    });
    ul.appendChild(li);
    for(let i=1; i<=10; i++){
        let li = document.createElement('li');
        li.id = `list_${i}`
        li.className = `page`;
        li.textContent = `${i + (10 * c_page)}`;
        ul.appendChild(li);
    }
    li = document.createElement('li');
    li.id = 'page_next';
    li.textContent = '다음>';
    li.addEventListener('click', (e) => {
        e.preventDefault();
        c_page += 1;
        console.log(c_page);
        writeButton();
        //class이용해서 불러오고 반복문돌려서 li.textContent = `${i + (10 * c_page)}`;
    });
    ul.appendChild(li);
}

let count;
let isZoo;
(() => {
    count = document.querySelector('#article_qna');
    isZoo = document.querySelector('#isZoo');
    writeButton();
})();

document.querySelectorAll("#article_body tr").forEach((el) => {
    el.addEventListener('click', (e) => {
        const id = el.querySelector('td').textContent;
        getContent(id);
    })
});

const getContent = async (id) => {
    try {
        if(document.querySelector(`#article_${id}_content td`)){
            document.querySelector(`#article_${id}_content`).style.height = '0px';
            document.querySelector(`#article_${id}_content td`).remove();
            document.querySelector(`#article_${id}_content td`).remove();
            document.querySelector(`#article_${id}_input td`).remove();
        } else {
            const result = await axios.get(`/board/${id}/content`);
            const contents = result.data;
            let tr = document.querySelector(`#article_${id}_content`);
            tr.style.height = '100px';
            tr.innerHTML = '';
            contents.map(content => {
                let td = document.createElement('td');
                td.textContent = content.article_content;
                tr.appendChild(td);
                td = document.createElement('td');
                td.colSpan = 2;
                td.textContent = content.category;
                tr.appendChild(td);
            });
            if(isZoo){
                tr = document.querySelector(`#article_${id}_input`);
                tr.innerHTML = '';
                td = document.createElement('td');
                let form = document.createElement('form');
                let input = document.createElement('input');
                input.placeholder = '답변 입력';
                form.appendChild(input);
                td.appendChild(form);
                tr.appendChild(td);
            }

        }
    } catch (err) {
        console.error(err);
    }
}
/* end */
/* 테이블 페이지 */
document.querySelectorAll(".page").forEach((el) => {
    console.log(el);
    el.addEventListener('click', (e) => {
        const id = el.textContent;
        console.log(id)
        reText(id);
    });
});

const reText = async (id) => {
    try {
        const li = document.querySelector(`#list_${id}`);
        console.log(li);
    }
    catch(err) {
        console.log(err);
    }
}
/* end */

/* axios.get($) */
