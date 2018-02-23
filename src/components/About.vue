<template>

  <section class="about">
    <h1>Sudoku</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum aliquid eius consequuntur vitae labore magnam ut quo sint. Delectus dolores ea laudantium sed earum necessitatibus explicabo illum quibusdam quos a facilis, officiis fuga nostrum minima sequi corporis ratione vel architecto reiciendis accusamus laborum maiores repellat officia nihil. Dolore, nulla nesciunt?</p>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'about',
    props: [],
     mounted(){
     this.$parent.setTitle('About')
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
  .about {

  }
</style>
