import React from 'react'
import {postOneCelebrity} from '../store/celebrities'
import {connect} from 'react-redux'

export class AddCelebrityForm extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            occupation: '',
            netWorthMillions: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        //we should put some error handling here to tell user which fields are required
        this.props.postCelebrity(this.state)
        Array.from(document.getElementsByTagName('input')).map(elem => {
            if (elem.type === 'radio') {
                elem.checked = false
                return elem
            }
        })
        this.setState({
            firstName: '',
            lastName: '',
            gender: '',
            netWorthMillions: '',
            occupation: '',
            description: ''
        })
    }

    render() {
        const { firstName, lastName, gender, occupation, netWorthMillions, description } = this.state;

        return (
            <div>
                <main>
                    <h2>Add New Celebrity Here:</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='firstName'>First Name: </label>
                        <input onChange={this.handleChange} type='text' name='firstName' value={firstName} />
                        <br/>
                        <label htmlFor='lastName'>Last Name: </label>
                        <input onChange={this.handleChange} type='text' name='lastName' value={lastName} />
                        <br/>
                        <input onChange={this.handleChange} type='radio' name='gender' id='male' value='Male' />
                        <label htmlFor='male'>Male</label>
                        <input onChange={this.handleChange} type='radio' name='gender' id='female' value='Female' />
                        <label htmlFor='male'>Female</label>
                        <input onChange={this.handleChange} type='radio' name='gender' id='other' value='Other' />
                        <label htmlFor='other'>Other</label>
                        <br/>
                        <label htmlFor='occupation'>Occupation: </label>
                        <input onChange={this.handleChange} type='text' name='occupation' value={occupation} />
                        <br/>
                        <label htmlFor='netWorthMillions'>Net Worth (in millions): </label>
                        <input onChange={this.handleChange} type='number' name='netWorthMillions' value={netWorthMillions} step='.01' placeholder='00.00'/>
                        <label htmlFor='description'>Description: </label>
                        <textarea onChange={this.handleChange} name='description' value={description} />
                        <button type='submit'>Submit</button>
                    </form>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        celebrities: state.celebrities
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        postCelebrity: (celebrity) => dispatch(postOneCelebrity(celebrity))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(AddCelebrityForm);