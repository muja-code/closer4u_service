const bodyBox = () => {
  const orderRequests = document.getElementById('orderRequests');
  axios({
    method: 'get',
    url: '/api/orders/business',
    data: {},
  }).then((response) => {
    const datas = response.data.datas;
    const userInfo = response.data.userInfo;
    for (const data of datas) {
      const { address, createdAt, id, image, nickname, requested, status } =
        data;
      let tempHtml = ``;
      let button = ``;
      if (userInfo.member === 1) {
        button = `<button type="button" class="btn btn-secondary order-accept" value="${status}">대기
                  중</button>`;
      } else {
        button = `<button type="button" class="btn btn-secondary order-accept" disabled value="${status}">대기
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
                      <span id="member" style="display:none">${id}</span>
                      ${button}
                    </td>
                  </tr>`;
      orderRequests.insertAdjacentHTML('beforeend', tempHtml);
    }
  });
};
