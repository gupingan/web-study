let dataList = [
  {
    title: '品牌鞋子，高品质低价入手',
    publishTime: 200,
  },
  {
    title: '不是很贵，但是很暖',
    publishTime: 100,
  },
  {
    title: '无法拒绝的美食，跟我一起吃',
    publishTime: 300,
  },
]


dataList.sort((a, b) => parseInt(a.publishTime) - parseInt(b.publishTime))

console.log(dataList)