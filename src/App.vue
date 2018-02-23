<template>
  <div id="app">
    <div class="row justify-content-center navigation">
      <div class="col-2"> <a onclick="window.history.back()" v-if="navigate"><i class="fa fa-arrow-left"></i> </a></div>
      <div class="col-10 text-right">
        <span class="title">{{title}}</span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      title : 'app',
      navigate:true
    }
  },
  methods:{
    setTitle(title, navigate=true){
      this.title = title
      this.navigate = navigate
    }
  }
}
</script>

<style scoped>
.fa{
  margin-top: 5px;
  font-size: 1.3rem;
}
.navigation{
  background-color: rgba(0, 0, 0, .2)
}
.title{
  font-size: 1.5rem;
}
.title,.fa{
  color: #F7FFE8;
}
</style>
