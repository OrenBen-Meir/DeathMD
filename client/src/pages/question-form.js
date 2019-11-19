import React, { Component } from 'react';


export default class QuestionForm extends Component {
    constructor(props) {
        super(props);
         
    }
  


    render() {
      return (
            <div>
                <div>
                    <div>
                        <form>
                            <div>
                                <label>Label </label>
                                <input type="text"/>
                            </div>
                            <div>
                                <label>Label </label>
                                <input type="text"/>
                            </div>
                        </form>
                    </div>
                </div>
             </div>
        );
    }
}