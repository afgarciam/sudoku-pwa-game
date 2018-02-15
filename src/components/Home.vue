<template>

  <div class="home">
    <h1>SUDOKU</h1>
    <div class="row justify-content-md-center">
      <div class="col-10 col-sm-10 col-md-6">
        <button @click="play" class="btn btn-lg" >PLAY</button>
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
        console.log('play pressed',event)
        window.location.pathname = 'board'
      }
    },
    computed: {

    }
}
</script>

<style scoped >
  .home {

  }
</style>
