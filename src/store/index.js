import Vuex from "vuex";

import {user} from "./module/user.js";
import {alert} from "./module/alert.js";
import {market} from "./module/market.js";
import {company} from "./module/company.js";

export default new Vuex.Store({
    modules: {
        user,
        alert,
        market,
        company
    }
});
