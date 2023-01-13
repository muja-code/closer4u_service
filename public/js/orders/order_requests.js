document.addEventListener('DOMContentLoaded', async () => {
  await headBox();
  const orderRequests = document.getElementById('orderRequests');
  await axios({
    method: 'get',
    url: '/api/orders/business',
    data: {},
  }).then((response) => {
    const datas = response.data.datas;
    const userInfo = response.data.userInfo;
    for (const data of datas) {
      const { address, createdAt, id, image, nickname, requested } = data;
      let tempHtml = ``;
      let button = ``;
      if (userInfo.member === 1) {
        button = `<button type="button" class="btn btn-secondary order-accept" value="${id}">대기
                  중</button>`;
      } else {
        button = `<button type="button" class="btn btn-secondary order-accept" disabled value="${id}">대기
                  중</button>`;
      }
      tempHtml = `<tr>
                    <th scope="row">
                      <img src="${image}">
                    </th>
                    <td>
                      ${createdAt}
                    </td>
                    <td>
                      ${nickname}
                    </td>
                    <td>
                      ${address}
                    </td>
                    <td>
                      ${requested}
                    </td>
                    <td>
                      ${button}
                    </td>
                  </tr>`;
      orderRequests.insertAdjacentHTML('beforeend', tempHtml);
    }
  });
  const orderAcceptBtns = document.getElementsByClassName('order-accept');
  for (const orderAcceptBtn of orderAcceptBtns) {
    orderAcceptBtn.addEventListener('click', () => {
      const orderId = orderAcceptBtn.value;
      axios({
        method: 'put',
        url: '/api/orders/accept/' + orderId,
        data: {},
      }).then((response) => {
        const data = response.data;
        alert(data.message);
        window.location.href = '/order_requests_page';
      });
    });
  }
});
