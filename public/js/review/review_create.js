document.addEventListener('DOMContentLoaded', async () => {
  await headBox();
  const reviewButton = document.getElementById('reviewBtn');
  const orderId = document.location.href.split('/')[4];
  reviewButton.addEventListener('click', () => {
    const marks = document.getElementsByName('mark');
    const comment = document.getElementById('comment').value;
    let mark;
    marks.forEach((m) => {
      if (m.checked) {
        mark = m.value;
      }
    });

    axios({
      method: 'post',
      url: '/api/orders/reviews/' + orderId,
      data: {
        mark: mark,
        comment: comment,
      },
    })
      .then((response) => {
        const data = response.data;
        alert(data.message);
        window.location.href = '/order_list_page';
      })
      .catch((response) => {
        const data = response.response.data;
        console.log(data);
        alert(data.errorMessage);
      });
  });
});
