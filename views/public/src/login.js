document.querySelector('#login').addEventListener('submit',
    async (event) => {
        const useremail = event.target.useremail.value;
        const password = event.target.password.value;
        const loginMsg = document.querySelector('#loginMsg');
        if (useremail && password) {
            try {

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
