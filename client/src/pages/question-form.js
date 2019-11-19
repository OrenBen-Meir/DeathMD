import React, { Component } from 'react';
import 'react-bootstrap';

export default class QuestionForm extends Component {
    constructor(props) {
        super(props);
         
    }
  


    render() {
      return (
          <div>
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <form>
                                <label>Do you have a weird growing obsession of Todd Howard? </label> 
                                <input type="text"/> <br></br>
                            
                                <label>Do you feel pain in your legs? </label> 
                                <input type="text"/> <br></br>

                                <label>Do your joints hurt? </label> 
                                <input type="text"/> <br></br> 
                            </form>
                        </div>
                    </div>
                </div>
                
             </div>
        );
    }
}