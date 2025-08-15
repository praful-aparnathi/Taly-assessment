import { Routes } from '@angular/router';
import { ChoosePaymentsPlanComponents } from './choose-payments-plan/choose-payments-plan-components/choose-payments-plan-components';
import { AuthGuard } from './common/guard/auth-guard';

export const routes: Routes = [
    {
        path: 'choose-payments-plan',
        component: ChoosePaymentsPlanComponents,
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'choose-payments-plan', pathMatch: 'full' }
];
