import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashbord from '../pages/Dashboard';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />

            {/** Rotas para usuário logados */}
            <Route path="/dashboard" component={Dashbord} isPrivate />
        </Switch>
    );
};

export default Routes;
