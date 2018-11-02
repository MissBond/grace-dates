import React from 'react'
import {postReview} from '../store'
import {connect} from 'react-redux'

class Reviews extends React.Component {
    constructor() {
        super()
        this.state = {
            review: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.postReview(this.state.review)
        this.setState({
            review: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='review'>Type Review Below</label>
                    <textarea name='review' value={this.state.review} onChange={this.handleChange} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postReview: (review) => dispatch(postReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)