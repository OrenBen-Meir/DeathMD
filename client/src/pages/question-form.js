import React, { Component } from 'react';
import 'react-bootstrap';
import axios from 'axios';
// import { element } from 'prop-types';
// import { throwStatement } from '@babel/types';

import '../css/question-form.css';
import Logo from '../img/DeathMD_Logo_200x200.png';

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
      diagnosed: false,       // If user diagnosed
      retrain: false,         // If the user retrained
      correction: {},         // Object containing correction data
      diagnosisError: false   // Boolean telling if diagnosis is formatted 
    };       
  }


  componentDidMount() {
    axios.get('/api/symptoms')
      .then((res) => {
        // console.log(res.data);
        const symptoms = res.data.map( (elem) => { return { symptomName: elem.symptom_name, intensity : 0 } });
        this.setState({ symptoms: symptoms });
        // console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
        console.log("=========================");
        console.log(err.stack);
      });
  }

  onSubmit(e) {
    let symptomData = {};

    this.state.symptoms.forEach( (elem) => {    
      symptomData[elem.symptomName] = elem.intensity;
    })
    console.log(symptomData);
    console.log(JSON.stringify(symptomData));

    axios.post('/api/diagnose', { symptomData })
      .then(res => {
        const result = res.data;
        let correction = {};
        for(let condition in result) correction[condition] = false;
        this.setState({ response: result, diagnosed: true, correction: correction });
        this.setRetrain(false);
        console.log(this.state.response); // We have our result!!! 
        this.setState({diagnosisError: false});
      })
      .catch((err) => {
        console.log(err);
        console.log("=========================");
        console.log(err.stack);
        this.setState({diagnosisError: true});
      });
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
      symptomData[elem.symptomName] = elem.intensity;
    })
    axios.post('/api/retrain', {symptomData, diagnosisData: this.state.correction})
      .then(res => {
        console.log(res.data);
        this.setRetrain(true);
      })
      .catch((err) => {
        console.log(err);
        console.log("=========================");
        console.log(err.stack);
      })
  }

  setRetrain(val) {
    this.setState({ retrain: val });
  }

  render() {
    const questions = this.state.symptoms.map(symptom => {
      return (
        <div className="text-white mt-3 mb-3">
          <label name={symptom.symptomName}>{symptom.symptomName}</label> <br></br>
          <input className="rounded-pill input-box-custom text-center" name={symptom.symptomName} type="number" onChange={this.onChange} placeholder="  Enter a number from 0-5"/> <br></br>
        </div>
      );
    })

    let responseJsx = [];
    for(let condition in this.state.response){
      if(this.state.response[condition].has_condition){
        responseJsx.push((
          <div className="p-3 correction-custom">
            <h5 className="text-white mt-1">Condition: {condition}</h5>
            <div className="text-white">Confidence Score: {this.state.response[condition].confidence}</div>
          </div>
        ));
      }
    }
    const errorMessage = this.state.diagnosisError?(<p className="text-danger"><strong>Invalid values</strong></p>):null;
    console.log(errorMessage);

    let resultHeading = null;
    if(this.state.diagnosed){
      resultHeading = responseJsx.length>0? 
      (<h3 className="text-white mb-5">Lets hope your diagnosed conditions aren't fatal! <span role="img" aria-label="skull emoji">💀</span></h3>):
      (
        <div className="text-white">
          <h3>Congratulations, you haven't died yet!</h3>
          <img className="img-fluid img-custom rounded" src="https://i.ytimg.com/vi/HaGkk60kcjQ/maxresdefault.jpg" alt="Kono Dio Da"></img>
        </div>
      );
    }

    let correctionForm = []; 
    if(this.state.diagnosed){
      for(let condition in this.state.correction){
        correctionForm.push(
          (
            <div className="text-white p-3 correction-custom">
              <input type="checkbox" name={condition} value={this.state.correction[condition]} onClick={this.onCorrect}></input> {condition}<br></br>
            </div>
          )
        );
      }
    }


    const retrainHeader = this.state.diagnosed?(
      <h3 className="mt-5">Not satisfied? Fill out what you think are the correct diagnosis</h3>
    ): null;
    
    const correctButton = this.state.diagnosed?(
      <button className="btn mt-5 mb-5 rounded-pill btn-lg btn-custom btn-block text-white text-uppercase" width="300" type='submit' onClick={this.onSubmitCorrection}>Re-train Model</button>
    ):null;

    const retrained = this.state.retrain?(
      <div className="border-box-custom p-3">Correction sent, model will be re-trained to better predict your imminent demise!</div>
    ):null;

    return (
      <div>
        <section>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-3 mb-3"> 
            <img className="img-fluid logo-custom rounded-circle mt-5 mb-5" src={Logo} alt="Logo"></img>
            <h1 className="text-white mt-1 mb-2 border-box-custom p-3">Welcome to DeathMD!</h1>
            <h2 className="text-white mt-4 mb-2 text-light">Are you ready?</h2>                  
          </div>

          <div className="container-fluid text-white">          
            <div className="row d-flex justify-content-center">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <form className="mt-3 ">
                  <h3 className="mb-4">Enter a value from 0-5 depending on severity: </h3>
                  {errorMessage}
                  {questions}
                </form>
                <button className="btn mt-5 mb-5 rounded-pill btn-lg btn-custom btn-block text-white text-uppercase" type='submit' onClick={this.onSubmit}>Submit</button>
              </div>
            </div>

            {resultHeading}
            <div className="border-box-custom">
              {responseJsx}
            </div>
            {retrainHeader}

            <div className="row d-flex justify-content-center text-white">
              <div className="col-lg-12 col-md-12 col-sm-12 mt-3 mb-3">
                <form className="border-box-custom">
                  {correctionForm}
                </form>
              </div>
            </div>

            {correctButton}
            {retrained}
           
            <footer className="mt-5">
              <a href="/about">About us</a>    
              <p>  MIT License </p>
              <p> Team Star Platinum © 2019</p> 
            </footer>
              
          </div>
        </section>
      </div>
    );
  }
}