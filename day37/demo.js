Promise.resolve(42)
  .finally(() => {
    throw new Error('Finally error');
  })
  .then(result => {
    console.log('Then:', result); // 不会执行
  })
  .catch(error => {
    console.log('Catch:', error.message); // 输出: Catch: Finally error
  });