<template>
    <div>
        <form class="mb-5" style="width:250px;" @submit.prevent="addData">
            <div class="form-group">
                <label for="text">Market Name:</label>
                <input type="text" class="form-control" v-model="name">
            </div>             
            <button type="submit" class="btn btn-success" @click="Change">Change</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "MarketChange",
    data() {
        return {
            id: null,
            name: ""
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.name = this.$route.params.name;
    },
    methods: {
        ...mapActions({
            MarketChange: 'market/MarketChange'
        }),
        Change(){
            let reqData = {
                id: this.id,
                data:{
                    name: this.name
                }
            }
            this.MarketChange(reqData).then((status)=>{
                if(status)
                    this.$router.push({name:'Market'})
            })
        }
    },
}
</script>