const bodyBox = () => {
  const orderCreateBtn = document.getElementById('orderCreateBtn');

  orderCreateBtn.addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const image = document.getElementById('image').value;
    const requested = document.getElementById('requested').value;

    axios({
      method: 'post',
      url: '/api/orders',
      data: {
        nickname,
        phone,
        address,
        image,
        requested,
      },
    })
      .then((response) => {
        const data = response.data;
        alert(data.message);
        window.location.href = '/order_requests_page';
      })
      .catch((response) => {
        const data = response.response.data;
        console.log(data);
        alert(data.errorMessage);
      });
  });
};
