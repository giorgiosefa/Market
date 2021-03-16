<template>
  <div>   
    <Header></Header> 
    <div class="jumbotron">
      <div class="container">
          <div class="mt-1 col-sm-10 offset-sm-1">                  
              <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
              <router-view></router-view>
          </div>
        </div>  
    </div> 
  </div>   
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    name: 'app',      
    created() {
      this.success('error');
    },
    computed: {
      ...mapGetters({
        alert: 'alert/alert'
      })        
    },
    methods: {
      ...mapActions({
        success: 'alert/success',
        clear: 'alert/clear'
      })
    },
    watch:{
        $route (){
            this.clear();
        }
    } 
};
</script>


