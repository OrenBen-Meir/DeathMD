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
        this.setRetrain = this.setRetrain.bind(this);
        this.onCorrect = this.onCorrect.bind(this);
        this.onSubmitCorrection = this.onSubmitCorrection.bind(this);
        

        this.state = {
            symptoms: [],           // This is the array of symptoms we're getting from the back end.
            response: {},           // user's response 
            diagnosed: false,        // If user diagnosed
            retrain: false,        // If the user retrained
            correction: {}
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
            const result = res.data;
            let correction = {};
            for(let condition in result) correction[condition] = false;
            this.setState({
                response: result,
                diagnosed: true,
                correction: correction
            })
            this.setRetrain(false)
            console.log(this.state.response);           // We have our result!!! 
        }).catch((err) => {
            console.log(err);
            console.log("=========================");
            console.log(err.stack);
        })
    }

    onChange(e) {
        const name = e.target.name;
        let intensity = parseInt(e.target.value);
        if(!intensity) intensity = 0;
        let symptoms =  this.state.symptoms
        const index = symptoms.findIndex(elem => elem.symptomName === name);
        symptoms[index] = {symptomName: name, intensity : intensity };
        this.setState({ symptoms });
        // console.log(this.state.symptoms);
        
    }

    onCorrect(e){
        console.log(e.target.name)
        let correction = this.state.correction;
        correction[e.target.name] = !correction[e.target.name]
        this.setState({ correction });
        // console.log(this.state.correction);
    }
    
    onSubmitCorrection(e){
        let symptomData = {};

        this.state.symptoms.forEach( (elem) => {    
            symptomData[elem.symptomName] = elem.intensity
        })
        axios.post('/api/retrain', {symptomData, diagnosisData: this.state.correction})
        .then(res => {
            console.log(res.data);
            this.setRetrain(true);
        }).catch((err) => {
            console.log(err);
            console.log("=========================");
            console.log(err.stack);
        })
    }

    setRetrain(val) {
        this.setState({
            retrain: val,
        });
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

        let responseJsx = [];
        for(let condition in this.state.response){
            if(this.state.response[condition].has_condition)
                responseJsx.push((
                    <div>
                        <h5>{condition}</h5>
                        <div>Confidence: {this.state.response[condition].confidence}</div>
                    </div>
                ))
        }

        let resultHeading = null;
        if(this.state.diagnosed){
            resultHeading = responseJsx.length>0? 
            (<h3>Lets hope your diagnosed conditions aren't fatal! 💀</h3>):
            (
                <div>
                    <h3>Congradulations, you haven't died yet!</h3>
                    <img src="https://www.sideshow.com/wp/wp-content/uploads/2014/08/lsterminator.jpg"></img>
                </div>
            );
        }

        let correctionForm = []; 
        if(this.state.diagnosed){
            for(let condition in this.state.correction){
                correctionForm.push(
                    (
                        <div>
                            <input type="checkbox" name={condition} value={this.state.correction[condition]} onClick={this.onCorrect}></input> {condition}<br></br>
                        </div>
                    )
                );
            }
        }

        const retrainHeader = this.state.diagnosed?(<h3>Not satisfied? Fill out what you think are the correct diagnosis</h3>): null;
        const correctButton = this.state.diagnosed?(<button type='submit' onClick={this.onSubmitCorrection}>Submit</button>):null;
        const retrained = this.state.retrain?(<div>Correction sent, model will be re-trained to better predict your imminent demise!</div>):null;

        return (
            <div>
                <h1>Welcome to DeathMD!</h1>
                <h2>Are you ready?</h2>
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

                    {resultHeading}
                    {responseJsx}
                    {retrainHeader}

                    
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <form>
                                {correctionForm}
                            </form>
                        </div>
                    </div>
                    {correctButton}
                    {retrained}

                </div>
            </div>
        );
    }
}