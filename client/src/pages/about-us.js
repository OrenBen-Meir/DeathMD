import React, { Component } from 'react';
import "../css/about-us.css";

import Oren from "../img/Oren_Senpai.jpg";
import Rehman from "../img/Rehman.png";

export default class AboutUs extends Component {
 

  render() {
    return (
            <div>
                

                <header className="bg-primary text-center py-5 mb-4">       {/* Start of Header */}
                    <div className="container">
                        <h1 className="font-weight-light text-white">Team Star Platinum</h1>
                    </div>
                </header>                                                   {/* End of Header */}
                
                {/* Page Content */}
                <div className="container">             {/* Start of Container */}
                    <div className="row">               {/* Start of Row */}

                    
                    {/* Team Member 1 */}
                    <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card border-0 shadow">
                            <img src={Oren} className="card-img-top" alt="Oren Senpai" />
                                <div className="card-body text-center">
                                    <h5 className="card-title mb-0">Oren</h5>
                                <div className="card-text text-black-50">Built the backend and databases using MariaDB, Python, and Node.js</div>
                            </div>
                        </div>
                    </div>


                    {/* Team Member 2 */}
                    <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card border-0 shadow">
                            <img src={Rehman} className="card-img-top" alt="Rehman" />
                            <div className="card-body text-center">
                                <h5 className="card-title mb-0">Rehman</h5>
                                <div className="card-text text-black-50">Designed the Front-End with Node.js, React and Bootstrap</div>
                            </div>
                        </div>
                    </div>


                    {/* Team Member 3 */}
                    {/* Team Member 4 */}


                    </div>                              {/* End of Row */}
                </div>                                  {/* End of Container */}


            </div>
    );
  }
}
