<template>
  <div class="u-quill-body">
    <h1>
      vue 常用生命周期
      <br />
    </h1>
    <ul style>
      <li style>
        <a href="https://cn.vuejs.org/v2/guide/syntax.html">模板文档</a>
      </li>
      <li style>
        <a href="https://cn.vuejs.org/v2/api/">API文档</a>
      </li>
    </ul>
    <pre><code class="language-javascript">
<span style="color:#ff4e20">vue3.x 兼容，但是不建议使用</span>
export default {
  /** * data : 可用的数据，模板中的数据必须预定义 */
  data(){ 
    return { a:1, b:2 }
  },
  /** * computed： 自动计算，计算阶段的数据可以出现在模板中 */
  computed:{ 
    count(){ return this.a + this.b }
 },
  /** * 数据计算完毕，但是未渲染模板 this.$refs还未生成 */
 <span style="color:#ff4e20"> (vue3 change : created -> setup)(){ 
    this.dataInit()
    return {
      c:1
    }
  },
  </span>
  /** * 书写模板中和当前生命周期中可用的方法 */
  methods:{ 
    dataInit(){ console.log('我是请求数据等操作') 
    } },
  /** * 监测数据发生变化 */
  watch:{
    count(value){console.log('我的值发生了变化')}
    },
  /** * 模板渲染完毕 类似jQ $(function(){}) */
  mounted(){
     console.log("这里能读取虚拟dom")
      }
}    </code></pre>
    <h1 style>vue-route 路由配置</h1>
    <ul style>
      <li style="line-height: 24px">
        <a href="https://router.vuejs.org/zh/guide/essentials/named-routes.html">官方文档</a>
      </li>
    </ul>
    <pre><code class="language-javascript">
<span style="color:#ff4e20">vue3.x vueRoute4 api不再适用</span>
 { path: '/** 路由访问地址 */',
   component: function(){return import('/* 引入 vue 文件地址 */')},
   name:'/** 路由名称 */',
   redirect:'/** 路由重定向 */',
   meta:{auth：true}, /**  其他信息 比如必须需要登录 */
 }
   </code> </pre>
    <h1 style>vuex 状态管理</h1>
    <ul style>
      <li style="line-height: 24px">
        <a href="https://vuex.vuejs.org/zh/guide/state.html">官方文档</a>
      </li>
    </ul>
    <pre><code class="language-javascript">
<span style="color:#ff4e20">vue3.x 使用 pinia 代替</span>
const store = new Vuex.Store({
  /** * state : 全局 this.$store.state 只读 */
  state: {
    todos: [ { id: 1, name: '张三' }, { id: 2, name: '李四' } ]
  },
  /**
   * 修改 state 全局this.$store.commit('addName',{id:3,name:'王五'}) 触发
   * [重要]只有 mutations 阶段可以修改 state
   */
  mutations：{
    addName(state,userInfo){ state.push(userInfo) }
  }, 
  /** * action : 分发阶段 this.$store.dispatch('addName2') */
  action:{
    addName2(state){ state.commit('addName',{id:3,name:'王五'}) }
  },
  /** *  getters : 全局 this.$store.getters 只读  返回state计算后的值或者方法 */
  getters: {
     getNames: function(state) { return state.todos.filter(function(todo){ return todo.name}) }
  }
})
export default store
   </code> </pre>
    <h1>END</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    // 代码高亮
  },
}
</script>
