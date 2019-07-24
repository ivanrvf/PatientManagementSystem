
import {RouterModule, Routes} from "@angular/router";


export const routes:Routes = [
  {
    path: '',
    loadChildren: './list/list.module#ListModule'
  },
  
];

export const routing = RouterModule.forChild(routes);
