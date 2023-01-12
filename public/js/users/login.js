document.addEventListener('DOMContentLoaded', () => {
  const login = document.getElementById('login');

  login.addEventListener('click', () => {
    const accountId = document.getElementById('account_id').value;
    const password = document.getElementById('password').value;

    axios({
      method: 'post',
      url: '/api/users/login',
      data: {
        accountId,
        password,
      },
    })
      .then((response) => {
        const data = response.data;
        alert(data.message);
        window.location.href = '/';
      })
      .catch((response) => {
        const data = response.response.data;
        console.log(data);
        alert(data.errorMessage);
      });
  });
});
