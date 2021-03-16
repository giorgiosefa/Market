<template>
  <div>
    <div v-for="data in Markets" :key="data.id">    
      <List :Market="data.name" :Companies="data.company"></List>
    </div>
  </div>
</template>

<script>
import List from '@/components/List.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Home",
  components: {
    List
  },
  data() {
    return { 
      intervalId: null     
    }
  },
  computed: {
    ...mapGetters({
      Markets: 'market/Markets'
    })    
  },
  created() {    
    this.GetMarketsAll();
    this.intervalId = setInterval(() => {
        this.GetMarketsAll();
    }, 5000);
  },
  methods: {
    ...mapActions({
      GetMarketsAll: 'market/GetMarketsAll'
    })
  },
  watch:{
      $route (){
          console.log('destory')
          clearInterval(this.intervalId);
      }
  } 
};
</script>
