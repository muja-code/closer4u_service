const bodyBox = () => {
  const signup = document.getElementById('login');

  signup.addEventListener('click', () => {
    const member = document.getElementById('member').value;
    const accountId = document.getElementById('account_id').value;
    const password = document.getElementById('password').value;
    const check_password = document.getElementById('check_password').value;
    const nickname = document.getElementById('nickname').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    axios({
      method: 'post',
      url: '/api/users',
      data: {
        member,
        accountId,
        password,
        check_password,
        nickname,
        phone,
        address,
      },
    })
      .then((response) => {
        const data = response.data;
        alert(data.data.nickname + '님 ' + data.message);
        window.location.href = '/login_page';
      })
      .catch((response) => {
        const data = response.response.data;
        console.log(data);
        alert(data.errorMessage);
      });
  });
};
