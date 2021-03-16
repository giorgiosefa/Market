<template>
    <form class="mb-5" style="width:250px;" @submit.prevent="addData">
        <div class="form-group">
            <label for="text">Market Name:</label>
            <select @change="changeMarket($event)" class="w-100 border-0" style="height:38px;">
                <option value="">Select Market</option>
                <option v-for="market in Markets" :key="market.id" :value="market.id" :selected="market.id == marketId">{{market.name}}</option>
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
        <button type="submit" class="btn btn-success" @click="Change">Change</button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "CompanyChange",
    data() {
        return {
            id: null,
            marketId: null,
            market: "",
            company: "",
            price: null,  
        }
    },
    computed: {
      ...mapGetters({
          Markets: 'market/Markets'
      })
    },
    created() {
        this.GetMarkets();
        this.id = this.$route.params.id;
        this.marketId = this.$route.params.marketId;
        this.market = this.$route.params.market;
        this.company = this.$route.params.company;
        this.price = this.$route.params.price;
    },
    methods: { 
        ...mapActions({
            GetMarkets: 'market/GetMarkets',
            CompanyChange: 'company/CompanyChange'
        }),        
        Change(){
            let reqData = {
                id: this.id,
                data:{
                    marketId: this.marketId,
                    price: this.price,
                    name: this.company
                }
            }
            this.CompanyChange(reqData).then((status)=>{
                if(status){
                   this.$router.push({name:'Company'}) 
                }                
            })
            
        },
        changeMarket(event){
            this.marketId = event.target.value;
        }
    },
}
</script>