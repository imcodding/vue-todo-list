import Vuex from 'vuex';
import todoApp from './modules/todoApp'

export const store = new Vuex.Store({
    modules: {
        todoApp
    }
    
});