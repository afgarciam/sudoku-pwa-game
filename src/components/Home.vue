<template>

  <section class="home">
    <h1>home Component</h1>
  </section>

</template>

<script lang="js">
  import { UsersService } from "../services/UsersService";
  export default  {
    name: 'home',
    props: [],
    mounted() {
     const users = UsersService.getAll()
     users.then((u)=>{
       u.docs.forEach(user => {
         console.log(user.data())
       });
     })
    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped >
  .home {

  }
</style>
