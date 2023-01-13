document.addEventListener('DOMContentLoaded', async () => {
  await headBox();
  const memberSpan = document.getElementById('member');
  const orderList = document.getElementById('orderList');
  const member = memberSpan.innerText;
  let url = '';
  if (member === '1') {
    url = '/api/orders/companies';
  } else {
    url = '/api/orders/customers';
  }
  await axios({
    method: 'get',
    url: url,
    data: {},
  }).then((response) => {
    console.log(response);
    const datas = response.data.datas;
    for (const data of datas) {
      const { address, date, id, image, nickname, requested, review, status } =
        data;
      let showStatus = '';
      let tempHtml = ``;
      let statusBtn = ``;
      let reviewBtn = ``;

      switch (status) {
        case 0:
          showStatus = '대기 중';
          break;
        case 1:
          showStatus = '수거 중';
          break;
        case 2:
          showStatus = '수거 완료';
          break;
        case 3:
          showStatus = '배송 중';
          break;
        case 4:
          showStatus = '배송 완료';
          break;
      }

      if (member === '1') {
        if (status === 4) {
          statusBtn = `<td id=statusBtns>
          <button type="button" class="btn btn-secondary order-accept" disabled value="${id}">${showStatus}</button>
        </td>`;
          reviewBtn = `<td id="review">
          <button type="button" class="btn btn-secondary reviewButton" disabled value="${id}"><a href="/review_create_page/${id}">리뷰
          작성</a></button>
        </td>`;
        } else {
          statusBtn = `<td id=statusBtns>
          <button type="button" class="btn btn-secondary order-accept" value="${id}">${showStatus}</button>
        </td>`;
          reviewBtn = `<td id="review">
          <button type="button" class="btn btn-secondary reviewButton" disabled value="${id}"><a href="/review_create_page/${id}">리뷰
          작성</a></button>
        </td>`;
        }
      } else {
        if (status === 4) {
          statusBtn = `<td id=statusBtns>
                          <button type="button" class="btn btn-secondary order-accept" disabled value="${id}">${showStatus}</button>
                        </td>`;
          reviewBtn = `<td id="review">
                          <button type="button" class="btn btn-secondary reviewButton" value="${id}"><a href="/review_create_page/${id}">리뷰 작성</a></button>
                        </td>`;
        } else {
          statusBtn = `<td id=statusBtns>
          <button type="button" class="btn btn-secondary order-accept" disabled value="${id}">${showStatus}</button>
        </td>`;
          reviewBtn = `<td id="review">
          <button type="button" class="btn btn-secondary reviewButton" disabled value="${id}"><a href="/review_create_page/${id}">리뷰 작성</a></button>
        </td>`;
        }
      }

      if (review.length) {
        reviewBtn = `<td id="review">
                          <p>${'⭐'.repeat(review[0].mark)}</p>
                          <p>${review[0].comment}</p>
                        </td>`;
      }

      tempHtml = `<tr>
                    <th scope="row">
                      <img src="${image}">
                    </th>
                    <td>
                      ${date}
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
                    ${statusBtn}
                    ${reviewBtn}
                  </tr>`;
      orderList.insertAdjacentHTML('beforeend', tempHtml);
    }
  });

  const orderAcceptBtns = document.getElementsByClassName('order-accept');
  for (const orderAcceptBtn of orderAcceptBtns) {
    orderAcceptBtn.addEventListener('click', () => {
      const orderId = orderAcceptBtn.value;
      axios({
        method: 'put',
        url: '/api/orders/' + orderId,
        data: {},
      }).then((response) => {
        const data = response.data;
        alert(data.message);
        window.location.href = '/order_list_page';
      });
    });
  }
});
