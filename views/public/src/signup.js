// 이메일 중복 체크
let emailCheck = false;
emailcheck = async () => {
    const useremail = document.querySelector('#useremail').value;
    const emailMsg = document.querySelector('#emailMsg');
    try {
        if (useremail) {
            let data = await axios.get(`/signup/emailCheck?useremail=${useremail}`);
            console.log(data, '데이터');

            login_flag = data.data.login;
            console.log(login_flag, '로그인플래그');
            if (login_flag) {
                emailMsg.innerHTML = "사용할수 있는 이메일 입니다.";
                emailMsg.style.color = 'green';
                return emailCheck = true;
            } else {
                emailMsg.innerHTML = "이미 존재하는 이메일 입니다."
                emailMsg.style.color = 'red';
                return emailCheck = false;
            }
        } else {
            emailMsg.innerHTML = "이메일을 입력해주세요";
            emailMsg.style.color = 'red';
        }
        console.log(emailCheck);
    } catch (err) {
        console.error(err);
    }
}


// 비밀번호 체크
let pwCheck = false;
pwcheck = () => {
    const password = document.querySelector('#password').value;
    const password2 = document.querySelector('#password2').value;
    const passwordMsg = document.querySelector('#passwordMsg');
    const signupPasswordMsg = document.querySelector('#signupPasswordMsg');
    if (password && password2) {
        if (password === password2) {
            passwordMsg.innerHTML = "비밀번호가 일치합니다.";
            signupPasswordMsg.innerHTML = "";
            passwordMsg.style.color = 'green';
            pwCheck = true;
        } else {
            passwordMsg.innerHTML = "비밀번호를 확인해주세요.";
            passwordMsg.style.color = 'red';
            pwCheck = false;
        }
    }
}

// 핸드폰번호 체크
let phoneCheck = true;
phonecheck = () => {

}

// 회원가입 체크
document.querySelector('#userSignup').addEventListener('submit',
    async (event) => {
        const useremail = event.target.useremail.value;
        const password = event.target.password.value;
        const password2 = event.target.password2.value;
        const username = event.target.username.value;
        const usercode = event.target.usercode.value;
        const phonenum = event.target.phonenum.value;
        const usercomment = event.target.usercomment.value;

        const signupEmailMsg = document.querySelector('#signupEmailMsg');
        const signupPasswordMsg = document.querySelector('#signupPasswordMsg');
        const signupNameMsg = document.querySelector('#signupNameMsg');
        const signupUsercodeMsg = document.querySelector('#signupUsercodeMsg');
        const signupPhonenumMsg = document.querySelector('#signupPhonenumMsg');
        const signupMsg = document.querySelector('#signupMsg');
        signupEmailMsg.style.color = 'red';
        signupPasswordMsg.style.color = 'red';
        signupNameMsg.style.color = 'red';
        signupUsercodeMsg.style.color = 'red';
        signupPhonenumMsg.style.color = 'red';
        signupMsg.style.color = 'red';
        if (!useremail || !password || !password2 || !username || !usercode || !phonenum || !emailCheck || !pwCheck ) {
            event.preventDefault();
            if (!useremail) {
                signupEmailMsg.innerHTML = "이메일을 입력해주세요.";
            } else if (emailCheck == false) {
                signupEmailMsg.innerHTML = "이메일 중복확인을 해주세요.";
            } else {
                signupEmailMsg.innerHTML = "";
            }
            if (!password || !password2) {
                signupPasswordMsg.innerHTML = "비밀번호를 입력해주세요.";
            } else if (pwCheck == false) {
                signupPasswordMsg.innerHTML = "비밀번호가 다릅니다.";
            } else {
                signupPasswordMsg.innerHTML = "";
            }
            if (!username) {
                signupNameMsg.innerHTML = "이름을 입력해주세요.";
            } else {
                signupNameMsg.innerHTML = "";
            }
            if (!usercode) {
                signupUsercodeMsg.innerHTML = "유저코드를 입력해주세요.";
            } else {
                signupUsercodeMsg.innerHTML = "";
            }
            if (!phonenum) {
                signupPhonenumMsg.innerHTML = "핸드폰번호를 입력해주세요.";
            } else if (phoneCheck == false) {
                signupPhonenumMsg.innerHTML = "핸드폰번호를 확인해주세요";
            } else {
                signupPhonenumMsg.innerHTML = "";
            }
        } else {
            try {

            } catch (err) {
                signupMsg.innerHTML = "잘못 입력된 정보가 있습니다. 확인해주세요.";
                console.error(err);
            }
        }
    });