import {MainView} from "./main.view";
import {Post} from "./post.model";

// var mainView = new MainView({model: new Post()});
new MainView({el: $('#main'), model: new Post()});