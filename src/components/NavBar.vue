<template>
  <div>
    <div class="nav">
      <ul class="nav-content">
        <li class="icon iconfont" style="color: silver;margin-top: -8px"></li>
        <li class="words" style="margin-left: 20px">校园二手交易平台</li>
        <li v-for="(item , index) in items" v-bind:key="index" style="margin-top: 10px">
          <a :href="item.href" :class="item.id" >{{item.name}}</a>
        </li>
        <li>
          <el-input type="text" placeholder="搜索书籍"  v-model="keywords" class="input"></el-input>
        </li>
        <li>
          <el-button class="button" type="primary" style="padding-left: 9px" @click="search">搜索</el-button>
        </li>
        <li>
          <el-avatar class="head" :src="avatar" size="large"></el-avatar>
        </li>
        <li>
          <el-dropdown class="drop" trigger="click" style="color: white">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="accountInfo">账号信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      nowIndex: 0,
      keywords: '',
      items: [
        {
          name: '首页',
          href: '#/'
        },
        {
          name: '收藏夹'
        },
        {
          name: '购物车',
          href: '#/userHome/myChart'
        },
        {
          name: '上架商品',
          href: '#/shelveBook'
        }
      ]
    }
  },
  methods: {
    search () {
      if (this.keywords === '') this.$router.push('/search')
    }
  }
}
</script>
<style type="text/css" scoped>
.nav{
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    height: 75px;
    min-width: 100%;
    width: 100.2%;
    background-image: linear-gradient(to right, #252F3F , #252F3F);

    margin-left: -4px;
    margin-right: -4px;
    z-index: 1000;
}
.nav .nav-content{
  width: 1200px;
  margin:0 auto;
  height: 50px;
}
.nav .nav-content > li{
  width: 100px;
  height: 75px;
  display: block;
  float: left;
}
.nav .nav-content li a{
  width: 100px;
  height: 75px;
  display: block;
  font-size: 20px;
  line-height: 50px;
  color: snow;
  font-weight: bolder
}
.nav .nav-content ul{
  position: absolute;
  left: 0;
  top: 75px;
  z-index: 99;
  width: 100%;
}
.nav .nav-content ul li{
  width: 120px;
  height: 75px;
  display: block;
  float: left;
  text-align: center;
  margin-right: 20px;
  line-height: 50px;
  background:  #2e0f6d;
}
.nav .nav-content ul li a:hover{
  background: #fff;
  color: #2e0f6d;
}
.nav .nav-content li a:hover{
  background: #fff;
  color: black;
  margin-top: -10px
}

.input{
  height: 50px;
  width: 218px;
  margin-top: 15px;
  margin-left: 180px
}
.button{
  width: 50%;
  margin-top: 15px;
  margin-left: 300px
}
.head{
  margin-top: 15px;
  margin-left: 310px;
}
.drop{
  margin-top: 32px;
  margin-left: 245px
}
.words{
  text-shadow: 0 0 5px mediumpurple,0 0 10px grey,0 0 15px #8ef1ef,0 0 20px #ffffff;
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin-top: 5px;
  padding-right: 80px
}
</style>
