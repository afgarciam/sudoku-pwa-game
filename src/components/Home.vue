<template>

  <div class="home">
    <h1 class="title">SUDOKU</h1>
    <div class="row justify-content-md-center">
      <div class="col-12 col-sm-12 col-md-6">
        <button @click="play" class="btn btn-lg btn-play btn-block" >PLAY <i class="fa fa-play"></i></button>
      </div>
    </div>
  </div>

</template>

<script lang="js">
  import { UsersService } from "../services/UsersService";
  export default  {
    name: 'home',
    props: [],
    mounted() {
    //  const users = UsersService.getAll()
    //  users.then((u)=>{
    //    u.docs.forEach(user => {
    //      console.log(user.data())
    //    });
    //  })
    },
    data() {
      return {

      }
    },
    methods: {
      play:function (event) {
        // console.log('play pressed',event)
        this.$router.push({path:'/board'})
      }
    },
    computed: {

    }
}
</script>

<style scoped >
  .home{
     font-family:  Passero One;
     color:#E37462;
  }
  .title {
    font-size: 3rem;
    text-align: center;
    margin: 2rem 0;
  }
  .btn-play{
    font-size: 2rem;
    color:#E37462;
  }
</style>
