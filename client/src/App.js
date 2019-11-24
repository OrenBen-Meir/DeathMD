import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from 'react-router-dom';

import QuestionairePage from '../src/pages/question-form';
import AboutUs from '../src/pages/about-us';

import '../src/css/App.css';




class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
        
                <Route path="/" component={QuestionairePage} />             {/* This is the root path, makes sense to use this since this is a single page application ... */}
                <Route path="/about" component={AboutUs} />                 {/* About Us Page */}

              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;