<template>


  <form>
    <nav>
      <ul>
        <li id="profil">
          <figure @click.prevent="goToProfil" class="icon-user"></figure>
        </li>
        <li>
          <button @click.prevent></button>
        </li>
      </ul>
    </nav>

  </form>


</template>



<script>
export default {
  name: 'footerMenu',
  data:function () {
    return{

    }
  },

  methods: {
      goToProfil:function () {
        let appComp = this.$parent.$parent;
        appComp.flowPage = false;
        appComp.profilPage = true;

      },
      goToFlow:function () {
        let appComp = this.$parent.$parent ;
        appComp.profilPage = false;
        appComp.flowPage = true;

      }
  }

}

</script>


<style scoped>
  .icon-user:before {
    position: absolute;
    bottom: 20px;
    left: 0px;
    right: 0px;
    text-align: center;
    color: white;
    font-size: 40px;
  }
ul{
  list-style: none;
  display: inline-table;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;

}
nav{
  height:50px;
  background-color: white;
  border-top:2px solid black;
  position: fixed;
  bottom: 0;
  width: 100%;

}
ul li {
  display: inline-block;
}
ul li:first-child{
  margin-right: 70%;
}
#profil{
  position :absolute;
  top:-35px;
  left: 0;
  right: 0;
  margin: auto;
  width: 70px;

}
figure{
  font-size: 0px;
  width: 70px;
  height: 70px;
  display: block;
  border-radius: 50%;
  background-color: #e6184a;
  margin:0;
  cursor: pointer;
  color: white;
}








</style>


