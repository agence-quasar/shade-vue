<template>

 <main>

     <div class="container">
       <!--
       <button @click.prevent="google"class="input-file" id='change' ></button>
       <label tabindex="0" for="change" class="input-file-trigger">google connect</label>-->
 <!--      <a @click.prevent="facebook"class="btn">
         Se connecter avec Facebook</a>-->
       <a @click.prevent="google"class="btn">
         Se connecter avec google</a>

       <a @click.prevent="twitter"class="btn">
         Se connecter avec twitter</a>
     </div>


 </main>



</template>



<script>
export default {
  name: 'pageConnect',

  methods: {

      google : function () {
        let that = this;
        let vm = that.$parent.$parent;
        let parent = that.$parent;
        vm.provider.google.setCustomParameters({
          'display': 'popup'
        });
        vm.provider.google.addScope('email');
        firebase.auth().signInWithPopup(vm.provider.google).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          let token = result.credential.accessToken;
          // The signed-in user info.
          let user = result.user;

          // ...
          firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
            let  data = snapshot.val();
            let date = new Date();
            if (data == null){
              firebase.database().ref('/users/' + user.uid).set({
                username: user.displayName,
                mail : user.email,
                isPhoto : false,
                created : JSON.stringify(date),
                dateList : false,
                categoryActive : false,
                likeList : false



              }).then(function () {

                parent.isConnect = true;
                parent.profilPage = true;
                parent.user = user;
                parent.userTab = {
                  username: user.displayName,
                  mail : user.email,
                  isPhoto : false,
                  created : JSON.stringify(date),
                  dateList : false,
                  categoryActive : false,
                  likeList : false,
                  provider:'google'
                }
              })

            }else{
              date = JSON.stringify(date);

              firebase.database().ref('/users/' + user.uid + '/dateList').push({
                date
              });


              parent.isConnect = true;
              parent.flowPage = true;
              parent.user = user;
              parent.userTab = data;
            }


          });
        });
      },
    facebook : function () {
      let that = this;
      let vm = that.$parent.$parent;
      let parent = that.$parent;
      vm.provider.facebook.setCustomParameters({
        'display': 'popup'
      });
      vm.provider.facebook.addScope('email');
      firebase.auth().signInWithPopup(vm.provider.facebook).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;

        // ...
        firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
          let  data = snapshot.val();
          let date = new Date();
          if (data == null){
            firebase.database().ref('/users/' + user.uid).set({
              username: user.displayName,
              mail : user.email,
              isPhoto : false,
              created : JSON.stringify(date),
              dateList : false,
              categoryActive : false,
              likeList : false



            }).then(function () {

              parent.isConnect = true;
              parent.profilPage = true;
              parent.user = user;
              parent.userTab = {
                username: user.displayName,
                mail : user.email,
                isPhoto : false,
                created : JSON.stringify(date),
                dateList : false,
                categoryActive : false,
                likeList : false,
                provider:'facebook'

              }
            })

          }else{
            date = JSON.stringify(date);

            firebase.database().ref('/users/' + user.uid + '/dateList').push({
              date
            });


            parent.isConnect = true;
            parent.flowPage = true;
            parent.user = user;
            parent.userTab = data;
          }


        });
      });

  },
    twitter : function () {
      let that = this;
      let vm = that.$parent.$parent;
      let parent = that.$parent;
      firebase.auth().signInWithPopup(vm.provider.twitter).then(function(result) {

        // The signed-in user info.
        let user = result.user;

        // ...
        firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
          let  data = snapshot.val();
          let date = new Date();
          if (data == null){
            firebase.database().ref('/users/' + user.uid).set({
              username: user.displayName,
              mail : user.email,
              isPhoto : false,
              created : JSON.stringify(date),
              dateList : false,
              categoryActive : false,
              likeList : false


            }).then(function () {

              parent.isConnect = true;
              parent.profilPage = true;
              parent.user = user;
              parent.userTab = {
                username: user.displayName,
                mail : user.email,
                isPhoto : false,
                created : JSON.stringify(date),
                dateList : false,
                categoryActive : false,
                likeList : false,
                provider:'twitter'
              }
            })

          }else{
            date = JSON.stringify(date);

            firebase.database().ref('/users/' + user.uid + '/dateList').push({
              date
            });


            parent.isConnect = true;
            parent.flowPage = true;
            parent.user = user;
            parent.userTab = data;
          }


        });
      });
    }
  }
}


</script>


<style scoped>
  .container{
    position: fixed;
    bottom: 25vh;
    left: 0;
    right: 0;
    margin: auto;
  }
  main{
    background-image: url("../assets/Shade_logo_blanc.jpg");
    background-size: cover;
    background-position: 50% 50%;
    height:100vh;
    width: 100%;
    position: fixed;
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
    margin: 5px 0;
    display:inline-block;
  }




</style>


