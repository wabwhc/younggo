document.querySelector('#login').addEventListener('submit',
    async (event) => {
        const useremail = event.target.useremail.value;
        const password = event.target.password.value;
        const loginMsg = document.querySelector('#loginMsg');
        const emailMsg = document.querySelector('#emailMsg');
        const passwordMsg = document.querySelector('#passwordMsg');
        if (useremail && password) {
            try {
                // emailMsg.innerHTML = "";
                // passwordMsg.innerHTML = "";
                // // 만약 email이 없거나 비밀번호가 틀릴결우 아이디 비밀번호를 확인해달라고 메시지 전달
                // if (emaildata == 없음 || passworddata == 틀릴경우) {
                //     event.preventDefault();
                //     loginMsg.innerHTML = "이메일이나 비밀번호를 확인해주세요.";
                //     loginMsg.style.color = 'red';
                // }
            } catch (err) {
                console.error(err);
            }
            // event.target.useremail.value = '';
            // event.target.password.value = '';
        } else if (!useremail) {
            event.preventDefault();
            emailMsg.innerHTML = "이메일을 입력해주세요.";
            passwordMsg.innerHTML = "";
            emailMsg.style.color = 'red';
        } else if (!password) {
            event.preventDefault();
            passwordMsg.innerHTML = "비밀번호를 입력해주세요.";
            emailMsg.innerHTML = "";
            passwordMsg.style.color = 'red';
        }
    }
);

// 이메일 인증
sendEmail = (req, res) => {
    if (emailCheck) {
        window.open('/email', 'window_name', 'width=430,height=500,location=no,status=no,scrollbars=yes');
    } else {
        return alert("이메일을 확인해주세요.");
    }
}
