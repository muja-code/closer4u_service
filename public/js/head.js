const headBox = () => {
  const user = document.getElementById('user');
  const buttons = document.getElementById('buttons');
  const userInfo = convertCookieToObject(document.cookie);
  if (userInfo) {
    const { accountId, member, nickname } = userInfo.userInfo;
    const userHtml = `<span id="userId" style="display: none;">${accountId}</span>
                      <span id="member" style="display: none;">${member}</span>
                      <p>${nickname}님</p>`;
    let tempHtml = ``;
    if (member === '1') {
      tempHtml = `<button type="button" class="btn btn-info"><a href="/profile_page">마이페이지</a></button>
                  <button type="button" class="btn btn-secondary"><a href="/order_requests_page">주문신청내역</a></button>
                  <button type="button" class="btn btn-secondary"><a href="/order_list_page">주문접수내역</a></button>
                  <button type="button" class="btn btn-dark logout">로그아웃</button>`;
    } else {
      tempHtml = `<button type="button" class="btn btn-secondary"><a href="/order_create_page">주문신청</a></button>
                  <button type="button" class="btn btn-secondary"><a href="/order_requests_page">주문신청내역</a></button>
                  <button type="button" class="btn btn-secondary"><a href="/order_list_page">주문접수내역</a></button>
                  <button type="button" class="btn btn-info"><a href="/profile_page">마이페이지</a></button>
                  <button type="button" class="btn btn-dark logout">로그아웃</button>`;
    }
    user.insertAdjacentHTML('beforeend', userHtml);
    buttons.insertAdjacentHTML('beforeend', tempHtml);

    const logoutBtns = document.getElementsByClassName('logout');
    for (const logoutBtn of logoutBtns) {
      logoutBtn.addEventListener('click', () => {
        axios({
          method: 'post',
          url: '/api/users/logout',
          data: {},
        }).then((response) => {
          const data = response.data;
          alert(data.message);
          window.location.href = '/';
        });
      });
    }
  } else {
    tempHtml = `<button type="button" class="btn btn-primary"><a href="/login_page">로그인</a></button>
                <button type="button" class="btn btn-primary"><a href="/signup_page">회원가입</a></button>`;

    buttons.insertAdjacentHTML('beforeend', tempHtml);
  }
};

function convertCookieToObject(cookies) {
  if (cookies) {
    const cookieItems = cookies.split(';');

    const obj = {};
    // '='으로 분리
    const elem = cookieItems[0].split('=');
    // 키 가져오기
    const key = elem[0].trim();
    // 값 가져오기
    const val = decodeURIComponent(elem[1]).split(',');

    // 저장
    obj[key] = {
      accountId: val[0],
      member: val[1],
      nickname: val[2],
      point: val[3],
    };
    return obj;
  } else {
    return false;
  }
}
