<template>
    <div>
        <form class="mb-5" style="width:250px;" @submit.prevent="addData">
            <div class="form-group">
                <label for="text">Market Name:</label>
                <select @change="changeMarket($event)" class="w-100 border-0" style="height:38px;">
                    <option value="" selected>Select Market</option>
                    <option v-for="market in Markets" :key="market.id" :value="market.id">{{market.name}}</option>
                </select>
            </div> 
            <div class="form-group">
                <label for="text">Company Name:</label>
                <input v-model="company" type="text" class="form-control">
            </div>
            
            <div class="form-group">
                <label for="text">Price:</label>
                <input v-model="price" type="text" class="form-control">
            </div>           
            <button type="submit" class="btn btn-success">Add</button>
        </form>

        <table class="table bg-light">
            <thead>
                <tr>
                    <th>Market Name</th>
                    <th>Comapny Name</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in Companies" :key="data.id">
                    <td>{{GetMarketName(data.marketId)}}</td>
                    <td>{{data.name}}</td>
                    <td>{{data.price}}</td>
                    <td><button type="button" class="btn btn-primary" @click="editData(data.id, data.marketId, GetMarketName(data.marketId), data.name, data.price)">Change</button></td>
                    <td><button type="button" class="btn btn-danger" @click="deleteData(data.id)">Delete</button></td>
                </tr>                
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "Company",
    data () {
        return { 
            marketId: "",
            company: "",
            price: null            
        }
  },
  created() {
      this.GetMarkets().then(()=>{
          this.GetCompanies();
      })      
  },
  computed: {
      ...mapGetters({
          Markets: 'market/Markets',
          Companies: 'company/Companies'
      })        
  },
  methods: { 
      ...mapActions({
          GetMarkets: 'market/GetMarkets',
          GetCompanies: 'company/GetCompanies',
          CompanyAdd: 'company/CompanyAdd',
          CompanyDelete: 'company/CompanyDelete'
      }),
      GetMarketName(marketId){
        if(marketId != undefined){
            console.log(this.Markets.find((e)=> e.id == marketId))
            console.log(marketId)
            console.log(this.Markets)
            return this.Markets.find((e)=> e.id == marketId).name;
        }
      },     
      changeMarket(event){
          this.marketId = event.target.value;
      },
      addData(){  
          let reqData = {
            marketId: this.marketId,
            price: this.price,
            name: this.company
          }          
          this.CompanyAdd(reqData).then(()=>{
                this.marketId = "";
                this.company = "";
                this.price = null; 
          })
      },
      editData(id, marketId, market, company, price){
          this.$router.push({name:'CompanyChange', params:{ id: id, marketId: marketId, market: market, company: company, price: price }})
      },
      deleteData(id){
        if(confirm('are you sure?'))
            this.CompanyDelete(id).then((status)=>{
                if(status)
                    this.$router.push({name:'Company'});
            });       
      }
  },
}
</script>