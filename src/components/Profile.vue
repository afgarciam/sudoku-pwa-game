<template>

  <section class="profile">
    <h1>User Info</h1>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'profile',
    props: [],
     mounted(){
     this.$parent.setTitle('Profile')
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

<style scoped>
  .profile {

  }
</style>
