<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <div class="name">iuuKai</div>
            <div class="access">超级管理员</div>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-04-01</span></p>
          <p>上次登录地点：<span>广东</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px; margin-top: 20px">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="information">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{
            display: 'flex',
            padding: 0
          }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{
              backgroundColor: item.color
            }"
          ></i>
          <div class="detail">
            <p class="num">￥ {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart style="height: 280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart style="height: 260px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart style="height: 260px" :chartData="echartData.video"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '@/components/EChart'
export default {
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.$http.get('/home/getData').then(({ data }) => {
        const res = data
        // 表格数据
        this.tableData = res.data.tableData

        // 订单折线图
        const orderData = res.data.orderData
        this.echartData.order.xData = orderData.date
        // 第一步，取出series中的name部分key
        const keyArray = Object.keys(orderData.data[0])
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === 'wechat' ? '小程序' : key,
            data: orderData.data.map(item => item[key]),
            type: 'line'
          })
        })

        // 用户柱状图
        this.echartData.user.xData = res.data.userData.map(item => item.date)
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.data.userData.map(item => item.new),
          type: 'bar'
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.data.userData.map(item => item.active),
          barGap: 0,
          type: 'bar'
        })

        // 视频饼图
        this.echartData.video.series.push({
          data: res.data.videoData,
          radius: '50%',
          center: ['55%', '50%'],
          type: 'pie'
        })
      })
    }
  },
  data () {
    return {
      userImg: require('@/assets/images/user.jpeg'),
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#42b983'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#F56C6C'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#42b983'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#F56C6C'
        }
      ],
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  components: {
    Echart
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home';
</style>
