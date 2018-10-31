import React from 'react'
import {connect} from 'react-redux'
import CelebrityUpdate from './celebrity-update'
import {removeSelectedCelebrity} from '../store'

const CelebritySingleView = props => {
  const {celebrity, deleted} = props;

  return (
    <div id="celebrity-single-view-container">
      <h1>{celebrity.firstName} {celebrity.lastName}</h1>
      <img className="celebrity-profile-img" src={celebrity.imageUrl}/>
      <h3>{celebrity.occupation}</h3>
      <div>{celebrity.gender}</div>
      <div>{celebrity.netWorthMillions}</div>
      <p>{celebrity.description}</p>
      <CelebrityUpdate />
      <button onClick={() => deleted(celebrity.id)} type="button" className="delete" >Delete</button>
    </div>
  )
}

const mapStateToProps = ({ selectedCelebrity }) => ({ celebrity:  selectedCelebrity });

const mapDispatchToProps = dispatch => ({
  deleted: celebrity => dispatch(removeSelectedCelebrity(celebrity))
});

export default connect(mapStateToProps, mapDispatchToProps)(CelebritySingleView);
