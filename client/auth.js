let page;
let Phone;
let Pass;
let requestData;
function admin() {
    const inputField2 = document.getElementById('pass');
    Pass = inputField2.value;
    requestData = {
        password: Pass,
    };
    login('http://localhost:5000/api/authAdmin');
   page = 'teacher.html';
}

function user(){
    const inputField1 = document.getElementById('phone');
    Phone = inputField1.value;
    const inputField2 = document.getElementById('pass');
    Pass = inputField2.value;
    requestData = {
        phone: Phone,
        password: Pass,
    };
    page = 'cab.html';
    login('http://localhost:5000/api/authUser');
}

function login(url) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            let mess = "";
            if (data.errors && Array.isArray(data.errors)) {
                data.errors.forEach(element => {
                    mess += element.msg + "\n";
                });
                alert(mess);
            }
            console.log('Ответ сервера:', data);
            if(data.id){
                window.location.href = page;
            }


        })
        .catch(error => {
            console.error('Ошибка сервера, сообщите нам в Телеграм о ней:', error);
            alert('Ошибка сервера, сообщите о ней нам в Телеграм!');

        });

}