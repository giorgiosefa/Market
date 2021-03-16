<template>
    <div>
        <form class="mb-5" style="width:250px;" @submit.prevent="addData">
            <div class="form-group">
                <label for="text">Market Name:</label>
                <input type="text" class="form-control" v-model="name">
            </div>             
            <button type="submit" class="btn btn-success">Add</button>
        </form>
        <table class="table bg-light">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Change</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in Markets" :key="data.id">
                    <td>{{data.name}}</td>
                    <td><button type="button" class="btn btn-primary" @click="editData(data.id, data.name)">Change</button></td>
                    <td><button type="button" class="btn btn-danger" @click="deleteData(data.id)">Delete</button></td>
                </tr>                
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "Market",
    data () {
        return { 
            name: '',           
            items: []
        }
  },
  created() {
      this.GetMarkets()
  },
  computed:{
      ...mapGetters({
          Markets: 'market/Markets'
      })
  },
  methods: {  
      ...mapActions({
          GetMarkets: 'market/GetMarkets',
          MarketAdd: 'market/MarketAdd',
          MarketDelete: 'market/MarketDelete'
      }),  
      addData(){
          let reqData = {
              name: this.name
          }
          this.MarketAdd(reqData).then(()=>{
              this.name = "";
          });
      },
      editData(id, name){
          this.$router.push({name:'MarketChange', params:{ id: id, name: name }})
      },
      deleteData(id){
        if(confirm('are you sure?'))
            this.MarketDelete(id).then((status)=>{
                if(status)
                    this.$router.push({name:'Market'});
            });
      }
  },
}
</script>