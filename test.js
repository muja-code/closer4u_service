const arr = [
  {
    id: 1,
    name: 'name',
  },
  {
    id: 2,
    name: 'name',
  },
  {
    id: 3,
    name: 'name',
  },
  {
    id: 4,
    name: 'name',
  },
  {
    id: 5,
    name: 'name',
  },
];

const userId = 3;

let user;

for (let i = 0; i < arr.length; i++) {
  console.log(i + '번 : ', arr[i]);
  // console.log(`userId === arr[i].id : ${userId} === ${arr[i].id}`);
  if (userId === arr[i].id) {
    return;
  }
}

for (let i = 0; i < arr.length; i++) {
  // console.log(i + '번 : ', arr[i]);
  console.log(`${i}번째 userId === arr[i].id : ${userId} === ${arr[i].id}`);
  if (userId === arr[i].id) {
    user = arr[i].id;
    return;
  }
}

console.log('user >>>>>>', user);
