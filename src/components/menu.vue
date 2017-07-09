<template>


  <form>
    <nav>
      <ul>
        <li>
          <a class="btn" @click.prevent='goToFiltre'>filtres</a>
        </li>
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

      },
    goToFiltre:function () {
      let appComp = this.$parent.$parent ;
      appComp.pageFiltre = true;
      appComp.flowPage = false;

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

  .btn {
    background: -moz-linear-gradient(left, #e26a84 0%, #e5244e 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,#e26a84 0%,#e5244e 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,#e26a84 0%,#e5244e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#e5244e',GradientType=1 ); /* IE6-9 */
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    font-family: Arial;
    color: #ffffff;
    font-size: 16px;
    padding: 13px 20px 13px 20px;
    text-decoration: none;
    margin: -18px;
    display:inline-block;
  }







</style>


