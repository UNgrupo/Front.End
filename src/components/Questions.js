import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import questionActions from '../_actions/actions-question';
import userActions from '../_actions/actions-user';

import '../styles/Questions.css';

class Questions extends Component {
  
  componentDidMount(){
    
    const {topic_id} = this.props.match.params;
    
    this.props.dispatch( questionActions.getAllByForeanId( topic_id, 'topic' ) );
    
    this.props.dispatch( userActions.getAll() );
  }
  
  render() {
    
    let questions = [];
    if( !this.props.question.data && !this.props.user.data )
      questions = this.props.question.map((question, i) => {
        
        const username = this.props.user[question.attributes['user-id']-1].attributes.usern;
        
        return (
          
          <div key={i} className="panel border-panel">
            <div className="panel-body px-5 py-3">
              <a href={"/questions/"+this.props.match.params.topic_id+'/'+question.id} className="no-decoration-a">
                <h4>{question.attributes.title}</h4>
              </a>
              <div className="row">
                <div className="col">
                  <Link to={{ pathname: "/" + username}}>{username}</Link> {/*userLoggedProfile variable que dira si el usuario puede o no hacer cambios en el perfil*/}
                </div>
                <div className="col">
                  {question.attributes.date}
                </div>
              </div>
            </div>
          </div>
        );
      });
    
    return (
      <div>
        <Navbar />
        
        <div className="content">
          <div className="px-5 mx-5">
            <h1 className="text-center my-4">Questions</h1>
            <div className="panel border-panel">
              <div className="panel-body px-5 py-3">
                <a href={"/questions/new_question/"+this.props.match.params.topic_id} className="no-decoration-a">
                  <h4>Add a new question</h4>
                </a>
              </div>
            </div>
            {questions}
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
}

function mapStateToProps( state ){
  const { question, user } = state;
  return {
    question, 
    user
  };
}

export default connect(mapStateToProps)(Questions);