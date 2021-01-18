import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Episodes from '../components/Episodes';
import Home from '../components/Home';
import Navbar from '../components/Navbar';

const AppRouter: React.FC = (): JSX.Element => {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/episodes" component={Episodes} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router >
    );
};

export default AppRouter;