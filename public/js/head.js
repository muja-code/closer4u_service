document.addEventListener('DOMContentLoaded', () => {
  const user = document.getElementById('user');
  const buttons = document.getElementById('buttons');

  axios({
    method: 'get',
    url: '/api/users',
    data: {},
  })
    .then((response) => {
      const { id, member, nickname, point } = response.data.data;
      const userHtml = `<span id="userId" style="display: none;">${id}</span>
                        <span id="member" style="display: none;">${member}</span>
                        <p>${nickname}님</p>
                        <p>${point} 포인트</p>`;
      let tempHtml = ``;
      if (member === 1) {
        tempHtml = `<button type="button" class="btn btn-info"><a href="/profile_page">마이페이지</a></button>
                    <button type="button" class="btn btn-secondary"><a href="/order_requests_page">주문신청내역</a></button>
                    <button type="button" class="btn btn-secondary"><a href="/order_list_page">주문접수내역</a></button>
                    <button type="button" class="btn btn-dark logout">로그아웃</button>
                    `;
      } else {
        tempHtml = `<button type="button" class="btn btn-secondary"><a href="/order_create_page">주문신청</a></button>
                    <button type="button" class="btn btn-secondary"><a href="/order_requests_page">주문신청내역</a></button>
                    <button type="button" class="btn btn-secondary"><a href="/order_list_page">주문접수내역</a></button>
                    <button type="button" class="btn btn-info"><a href="/profile_page">마이페이지</a></button>
                    <button type="button" class="btn btn-dark logout">로그아웃</button>`;
      }
      user.insertAdjacentHTML('beforeend', userHtml);
      buttons.insertAdjacentHTML('beforeend', tempHtml);
      bodyBox();
    })
    .catch(() => {
      const tempHtml = `<button type="button" class="btn btn-primary"><a href="/login_page">로그인</a></button>
                        <button type="button" class="btn btn-primary"><a href="/signup_page">회원가입</a></button>`;
      buttons.insertAdjacentHTML('beforeend', tempHtml);
    });
});
