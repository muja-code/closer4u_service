const supertest = require('supertest');

const app = require('../../app');
const { sequelize } = require('../../models/index');

beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') {
    await sequelize.sync();
  } else {
    throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
  }
});

describe('closer4u api 통합 테스트', () => {
  test('GET /api/users API 마이페이지 통합테스트 성공', async () => {
    const response = await supertest(app).get('/api/users');

    expect(response.status).toEqual(200);
  });

  test('GET /api/orders/business API 고객 주문 신청내역 가져오기 통합테스트 성공', async () => {
    const response = await supertest(app).get('/api/orders/business');

    expect(response.status).toEqual(200);
  });

  test('GET /api/orders API 업체 주문 접수내역 가져오기 통합테스트 성공', async () => {
    const response = await supertest(app).get('/api/orders');

    expect(response.status).toEqual(200);
  });

  test('PUT /accept/:orderId API 주문 접수 통합테스트 성공', async () => {
    const response = await supertest(app).put('/api/orders/accept/1');

    expect(response.status).toEqual(201);
  });

  test('PUT /accept/:orderId API 주문 접수 통합테스트 orderId가 데이터베이스에 없는 실패', async () => {
    const response = await supertest(app).put('/api/orders/accept/5');

    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({
      errorMessage: '주문이 존재하지 않습니다.',
    });
  });

  test('PUT /accept/:orderId API 주문 접수 통합테스트 orderId 파라미터가 없는 실패', async () => {
    const response = await supertest(app).put('/api/orders/accept/');

    expect(response.status).toEqual(404);

    expect(response.body).toMatchObject({
      errorMessage: '주문이 존재하지 않습니다.',
    });
  });

  test('PUT //:orderId API 주문 상태 변경 통합테스트 성공', async () => {
    const response = await supertest(app)
      .put('/api/orders/accept/1')
      .send({ status: 1 });

    expect(response.status).toEqual(201);
  });

  test('PUT //:orderId API 주문 상태 변경 통합테스트 orderId가 데이터베이스에 없는 실패', async () => {
    const response = await supertest(app)
      .put('/api/orders/accept/5')
      .send({ status: 1 });

    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({
      errorMessage: '주문이 존재하지 않습니다.',
    });
  });

  test('PUT //:orderId API 주문 상태 변경 통합테스트 orderId 파라미터가 없는 실패', async () => {
    const response = await supertest(app)
      .put('/api/orders/accept/')
      .send({ status: 1 });

    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({
      errorMessage: '주문이 존재하지 않습니다.',
    });
  });
});

afterAll(async () => {
  if (process.env.NODE_ENV === 'test') {
    await sequelize.sync({ force: true });
  } else {
    throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다');
  }
});
