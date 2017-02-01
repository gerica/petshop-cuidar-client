import { Route } from '@angular/router';
import { PrimeiroLoginComponent } from './index';

export const PrimeiroLoginRoutes: Route[] = [
  	{
    	path: 'primeiro-login/:email',
    	component: PrimeiroLoginComponent
  	}
];
