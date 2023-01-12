const bodyBox = () => {
  const memberSpan = document.getElementById('member');
  const orderList = document.getElementById('orderList');
  const member = memberSpan.innerText;
  let url = '';
  if (member === '1') {
    url = '/api/orders/companies';
  } else {
    url = '/api/orders/customers';
  }
  axios({
    method: 'get',
    url: url,
    data: {},
  }).then((response) => {
    const datas = response.data.datas;
    for (const data of datas) {
      console.log(data);
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

      if (member === 1) {
        statusBtn = `<td id=statusBtns>
                          <button type="button" class="btn btn-secondary order-accept" value="${status}">${showStatus}</button>
                        </td>`;
        reviewBtn = `<td id="review">
                          <button type="button" class="btn btn-secondary review-button" value="${id}"><a href="/review_create_page">리뷰 작성</a></button>
                        </td>`;
      } else {
        statusBtn = `<td id=statusBtns>
                          <button type="button" class="btn btn-secondary order-accept" disabled value="${status}">${showStatus}</button>
                        </td>`;
        reviewBtn = `<td id="review">
                          <button type="button" class="btn btn-secondary review-buttont" disabled value="${id}"><a href="/review_create_page">리뷰
                          작성</a></button>
                        </td>`;
      }

      if (review.length) {
        reviewBtn = `<td id="review">
                          <p>${review[0].comment}</p>
                          <p>${'⭐'.repeat(review[0].mark)}</p>
                        </td>`;
      }

      tempHtml = `<th scope="row">
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
                    ${reviewBtn}`;
      orderList.insertAdjacentHTML('beforeend', tempHtml);
    }
  });
};
