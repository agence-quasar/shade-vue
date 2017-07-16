<template>


  <form>
    <nav>
      <ul>
        <li>
          <span v-show="!profil" class="icon-reglages left" @click="goToFiltre"></span>
          <span v-show="profil" class="icon-flow left" @click="goToFLow"></span>
        </li>
        <li id="profil" class="icon-camera">
          <input  class="input-file "  type="file" @change="onFileChange">
        </li>
        <li>

          <span v-show="!profil" class="icon-Profil right" @click="goToProfil"></span>
          <a v-show="profil" class="icon-edit arrow-r right" @click="edit"></a>

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
        profil : false,

    }
  },

  methods: {
      edit:function () {
        let vm = this;
        console.log(vm.$children);
        vm.$parent.$children[1].edit(event);
      },
      goToProfil:function () {
        let appComp = this.$parent;
        appComp.flowPage = false;
        appComp.pageFiltre = false;
        appComp.profilPage = true;

      },
    goToFLow:function () {
        let appComp = this.$parent ;
        appComp.profilPage = false;
        appComp.pageFiltre = false;
        appComp.flowPage = true;

      },
    goToFiltre:function () {
      let appComp = this.$parent ;
      appComp.pageFiltre = true;
      appComp.flowPage = false;
      appComp.profilPage = false;


    },
    onFileChange(e) {
      let vm = this;




      loadImage(
        e.target.files[0],
        function () {


          let file = e.target.files[0];
          //console.log(file);
          vm.$parent.blob = file;
          console.log(file);
          console.log(vm.$parent);
          vm.$parent.pageUpload = true;
          vm.$parent.profilPage = false;
          vm.$parent.flowPage = false;
          vm.$parent.pageFiltre = false;
        },
        {canvas : true} // Options
      );


    }

  },

}

</script>


<style scoped>
  input[type="file"]:focus {
    border: none;
    outline: none;
  }
  input{
    font-size: 0px;
    width: 50px;
    height: 50px;
    opacity: 0;
  }
  .icon-camera:before {
    position: absolute;
    bottom: 20px;
    left: 0px;
    right: 0px;
    text-align: center;
    color: white;
    font-size: 33px;
    font-weight: 100;
  }
  #photo_icon{
    position: absolute;
    bottom: -10px;
    right: 0;
    left: 0;
  }


  #profil{
    font-size: 0px;
    width: 70px;
    height: 70px;
    display: block;
    position: absolute;
    top: -35px;
    left: 0;
    right: 0;
    border-radius: 50%;
    background-color: #e6184a;
    margin: 0 auto;
    cursor: pointer;
    color: white;
    box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
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
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top:2px solid #3c1042;

}
ul li {
  display: inline-block;
}
ul li:first-child{
  margin-right: 70%;
}
.left{    position: absolute;
  font-size: 35px;
  top: 8px;
  /* font-weight: 600; */
  left: calc( 0.5 * (50% - 70px) );
}
.right{    position: absolute;
    font-size: 35px;
    top: 8px;
  right: calc( 0.5 * (50% - 70px) );
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

  -webkit-box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
  -moz-box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
  box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
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


