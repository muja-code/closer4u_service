document.addEventListener('DOMContentLoaded', async () => {
  await headBox();
  const orderCreateBtn = document.getElementById('orderCreateBtn');

  orderCreateBtn.addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const image = document.getElementsByName('image')[0];
    const requested = document.getElementById('requested').value;
    const formData = new FormData();
    console.log(image.files[0]);
    formData.append('nickname', nickname);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('image', image.files[0]);
    formData.append('requested', requested);

    axios({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
      url: '/api/orders',
      data: formData,
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
});
