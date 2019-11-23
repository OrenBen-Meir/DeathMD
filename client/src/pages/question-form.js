import React, { Component } from 'react';
import 'react-bootstrap';
import axios from 'axios';
import { element } from 'prop-types';
import { throwStatement } from '@babel/types';

export default class QuestionForm extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            symptoms: [],           // This is the array of symptoms we're getting from the back end.
            response: {},           // user's response 
        }
         
    }


    componentDidMount() {
        axios.get('/api/symptoms')
            .then((res) => {
                // console.log(res.data);
                const symptoms = res.data.map( 
                    (elem) => { return { 
                        symptomName: elem.symptom_name, 
                        intensity : 0 
                    }
                })
                this.setState({
                    symptoms: symptoms
                })
                // console.log(this.state);
            }).catch((err) => {
                console.log(err);
                console.log("=========================");
                console.log(err.stack);
            })
    }

    onSubmit(e) {
        let symptomData = {};

        this.state.symptoms.forEach( (elem) => {    
            symptomData[elem.symptomName] = elem.intensity
        })
        console.log(symptomData)
        console.log(JSON.stringify(symptomData))

        axios.post('/api/diagnose', { symptomData })
        .then(res => {
            const result = res;
            console.log(result);
        }).catch((err) => {
            console.log(err);
            console.log("=========================");
            console.log(err.stack);
        })
    }

    onChange(e) {
        const name = e.target.name;
        const intensity = parseInt(e.target.value);
        let symptoms =  this.state.symptoms
        const index = symptoms.findIndex(elem => elem.symptomName === name);
        symptoms[index] = {symptomName: name, intensity : intensity };
        this.setState({ symptoms });
        // console.log(this.state.symptoms);
        
    }

    render() {

    
        const questions = this.state.symptoms.map(symptom => {
            return (
            <div>
                <label name={symptom.symptomName}>{symptom.symptomName}</label> <br></br>
                <input name={symptom.symptomName} type="number" onChange={this.onChange}/> <br></br>
            </div>
            )
        })


        return (
            <div>
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <form>
                                <h3>Enter a value from 0-5 depending on severity: </h3>
                                {questions}
                            </form>
                            <button type='submit' onClick={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}