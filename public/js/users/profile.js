document.addEventListener('DOMContentLoaded', async () => {
  await headBox();
  const profile = document.getElementById('profile');

  axios({
    method: 'get',
    url: '/api/users',
    data: {},
  })
    .then((response) => {
      const data = response.data.data;
      const { account_id, address, nickname, phone, point } = data;
      const tempHtml = `<li class="list-group-item">아이디 : ${account_id}
                        </li>
                        <li class="list-group-item">닉네임 : ${nickname}
                        </li>
                        <li class="list-group-item">전화번호 : ${phone}
                        </li>
                        <li class="list-group-item">주 소 : ${address}
                        </li>
                        <li class="list-group-item">포인트 : ${point}`;
      profile.insertAdjacentHTML('beforeend', tempHtml);
    })
    .catch((response) => {
      const data = response.response.data;
      console.log(data);
      alert(data.errorMessage);
    });
});
