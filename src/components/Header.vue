<template>
    <div class="navbar">
        <nav class="nav nav-underline">
            <router-link to="/" class="nav-link active">Dashboard</router-link>
            <router-link v-if="isAuth" to="/market" class="nav-link">Market</router-link>
            <router-link v-if="isAuth" to="/company" class="nav-link">Company</router-link>
        </nav>
        <form class="form-inline">
            <router-link v-if="!isAuth" to="/login" class="nav-link mr-md-2">Login</router-link>
            <a href="#" v-else @click.prevent="logOut" class="nav-link mr-md-2">LogOut</a>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "Header",
    computed:{
        ...mapGetters({
            isAuth: 'user/isAuth'
        })
    },
    methods: {
        ...mapActions({
            Logout: 'user/Logout'
        }),
        logOut(){
            this.Logout();
        }
    },
}
</script>