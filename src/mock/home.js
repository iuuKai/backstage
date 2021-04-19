import Mock from 'mockjs'

// 图表数据
const List = []

export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          vue: Mock.Random.float(1000, 8000, 0, 2),
          wechat: Mock.Random.float(1000, 8000, 0, 2),
          ES6: Mock.Random.float(1000, 8000, 0, 2),
          Redis: Mock.Random.float(1000, 8000, 0, 2),
          React: Mock.Random.float(1000, 8000, 0, 2),
          Springboot: Mock.Random.float(1000, 8000, 0, 2)
        })
      )
    }
    return {
      code: 20000,
      // 饼图
      data: {
        videoData: [
          {
            name: 'SpringBoot',
            value: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: 'Vue',
            value: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: '小程序',
            value: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: 'PHP',
            value: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: 'ES6',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'Java',
            value: Mock.Random.float(1000, 10000, 0, 2)
          }
        ],
        tableData: [
          {
            name: 'SpringBoot',
            todayBuy: Mock.Random.float(1000, 8000, 0, 2),
            monthBuy: Mock.Random.float(1000, 8000, 0, 2),
            totalBuy: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: 'Vue',
            todayBuy: Mock.Random.float(1000, 8000, 0, 2),
            monthBuy: Mock.Random.float(1000, 8000, 0, 2),
            totalBuy: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: '小程序',
            todayBuy: Mock.Random.float(1000, 8000, 0, 2),
            monthBuy: Mock.Random.float(1000, 8000, 0, 2),
            totalBuy: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: 'PHP',
            todayBuy: Mock.Random.float(1000, 8000, 0, 2),
            monthBuy: Mock.Random.float(1000, 8000, 0, 2),
            totalBuy: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: 'ES6',
            todayBuy: Mock.Random.float(1000, 8000, 0, 2),
            monthBuy: Mock.Random.float(1000, 8000, 0, 2),
            totalBuy: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: 'Java',
            todayBuy: Mock.Random.float(1000, 8000, 0, 2),
            monthBuy: Mock.Random.float(1000, 8000, 0, 2),
            totalBuy: Mock.Random.float(1000, 8000, 0, 2)
          }
        ],
        orderData: {
          date: [
            '20201001',
            '20201002',
            '20201003',
            '20201004',
            '20201005',
            '20201006',
            '20201007'
          ],
          data: List
        },
        userData: [
          {
            date: 'Mon',
            new: Mock.Random.float(0, 800, 0, 0),
            active: Mock.Random.float(0, 800, 0, 0)
          },
          {
            date: 'Tue',
            new: Mock.Random.float(0, 800, 0, 0),
            active: Mock.Random.float(0, 800, 0, 0)
          },
          {
            date: 'Wed',
            new: Mock.Random.float(0, 800, 0, 0),
            active: Mock.Random.float(0, 800, 0, 0)
          },
          {
            date: 'Thu',
            new: Mock.Random.float(0, 800, 0, 0),
            active: Mock.Random.float(0, 800, 0, 0)
          },
          {
            date: 'Fri',
            new: Mock.Random.float(0, 800, 0, 0),
            active: Mock.Random.float(0, 800, 0, 0)
          },
          {
            date: 'Sat',
            new: Mock.Random.float(0, 800, 0, 0),
            active: Mock.Random.float(0, 800, 0, 0)
          },
          {
            date: 'Sun',
            new: Mock.Random.float(0, 800, 0, 0),
            active: Mock.Random.float(0, 800, 0, 0)
          }
        ]
      }
    }
  }
}
