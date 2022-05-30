// 이메일 중복 체크

let emailCheck = false;
emailcheck = async () => {
    const useremail = document.querySelector('#useremail').value;
    const emailMsg = document.querySelector('#emailMsg');
    try {
        if (useremail) {
            const reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
            const sreg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

            if (useremail.match(reg) || useremail.match(sreg)) {
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
                emailMsg.innerHTML = "이메일 양식을 확인해주세요";
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

// 이메일 인증 체크

let evfcheck = false;
let sendEvfcode = '';
const evfbtn = document.querySelector('#evfbtn').addEventListener('click', async () => {
    console.log("코드 보냄")

    const useremail = document.querySelector('#useremail').value;
    const signupEvfMsg = document.querySelector('#signupEvfMsg');
    console.log(useremail, "이메일");
    try {

        if (useremail) {
            if (!emailCheck) {
                return
            }
            const data = await axios.get(`/signup/evf?useremail=${useremail}`);
            sendEvfcode = data.data.sendEvfcode;
            alert('인증번호가 전송되었습니다. 이메일을 확인해주세요');
        } else {
            signupEvfMsg.innerHTML = "이메일을 확인해주세요";
            signupEvfMsg.style.color = 'red';
        }

        console.log(evfcheck);
    } catch (err) {
        console.error(err);
    }
});

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
let phoneCheck = false;
phonecheck = () => {
    const phonenum = document.querySelector('#phonenum').value;
    const firstTel = phonenum.substring(0, 3);
    if (phonenum.length !== 11) {
        return phoneCheck = false;
    }
    if (firstTel !== ('010' || '011' || '016' || '017' || '018' || '019')) {
        return phoneCheck = false
    }
    return phoneCheck = true;
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
        const evfcode = event.target.emailverify.value;

        const signupEmailMsg = document.querySelector('#signupEmailMsg');
        const signupPasswordMsg = document.querySelector('#signupPasswordMsg');
        const signupNameMsg = document.querySelector('#signupNameMsg');
        const signupUsercodeMsg = document.querySelector('#signupUsercodeMsg');
        const signupPhonenumMsg = document.querySelector('#signupPhonenumMsg');
        const signupEvfMsg = document.querySelector('#signupEvfMsg');
        const signupMsg = document.querySelector('#signupMsg');

        signupEmailMsg.style.color = 'red';
        signupPasswordMsg.style.color = 'red';
        signupNameMsg.style.color = 'red';
        signupUsercodeMsg.style.color = 'red';
        signupPhonenumMsg.style.color = 'red';
        signupEvfMsg.style.color = 'red';
        signupMsg.style.color = 'red';

        console.log(evfcode, "evf코드")
        console.log(sendEvfcode, "보낸 evf코드")
        console.log(evfcode == sendEvfcode)
        console.log(evfcheck, "현재 evfcheck")
        if (evfcode == sendEvfcode)
            evfcheck = true;
        else
            evfcheck = false;


        if (!useremail || !password || !password2 || !username || !usercode || !phonenum || !evfcode || !evfcheck || !emailCheck || !pwCheck || !phoneCheck) {
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
            if (!evfcode) {
                signupEvfMsg.innerHTML = "인증번호를 입력해주세요.";
            } else if (evfcheck == false) {
                signupEvfMsg.innerHTML = "인증번호가 다릅니다.";
            } else {
                signupEvfMsg.innerHTML = "";
            }
        } else {
            try {

            } catch (err) {
                signupMsg.innerHTML = "잘못 입력된 정보가 있습니다. 확인해주세요.";
                console.error(err);
            }
        }
    });
