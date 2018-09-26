import React from 'react'
import { Checkbox, Repeatable, Text, Textarea, Select, Rating } from './components'
import api from './mockApi'

class App extends React.Component {
  constructor(props) {
    super(props)
    //Initializing state
    this.state = {
      isLoading: true,
      errMsg: '',
      updateMsg: '',
      data: {
        title: '',
        rating: 0,
        year: null,
        description: '',
        upcoming: false, 
        cast: []
      }
    }
  }
componentDidMount() {
  //On mount, if id is passes, gets from api
  const props = {...this.props}
  if(props.id) {
    api.get(props.id)
      .then((data) => {   
        this.setState({isLoading: false, data: data})
      })

      // Catches if either an invalid id or no id is sent
      .catch((data) => {
        this.setState({isLoading: false})
      })
    } 

    else {
    this.setState({isLoading: false})
    }
  }


  /**
   * 
   */
  //Sets state with data onChange as each input is changed
  handleChange = (delta) => {
    this.setState(({ data }) => ({ data: { ...data, ...delta }}))
  }

  /**
   * 
   */
  //After the publish button is clicked, posts state data to api 
  handleUpdate = async (publish = false) => {
    this.setState({updateMsg: 'Adding movie...', errMsg: ''})
    const { data } = this.state
    const results = await api.post({ ...data, publish })
    .then((res) => {   

    //If post is successfull, set success message and reset state to add functionality to add another movie to data
      setTimeout(() => {
        this.setState({updateMsg: 'Successfully Added!', errMsg: '', data: {
          title: '',
          rating: 0,
          year: null,
          description: '',
          upcoming: false, 
          cast: []} })}, 1000
          )
          return results
        }
      )
      
   //If error, catches error and displays error message
    .catch((err) => {
      setTimeout(() => {
        this.setState({errMsg: 'Whoops – API error. Please Try Again.', updateMsg: ''})
      }, 1000)
    })
  }

  // Handles changes, updates, and delets with each type of input
  Input = ({ children, iterable, label, id }) => {
    const handleChange = value => {
      this.handleChange({ [id]: value })
    }
    const value = this.state.data[id]

    let props = {}

    //If the element is repeatable, gives each element a unique id on creation of element and update and deletes element by it's id
    if(iterable) {
      props = {
        id,
        value,
        onCreate: (item) => handleChange([...value, {
          ...item,
          id: Math.floor(Math.random() * 100000),
        }]),
        onUpdate: (item) => handleChange(value.map(prev => {
          if(item.id === prev.id) {
            return item
          }
          return prev
        })),
        onDelete: (id) => handleChange(value.filter(prev => prev.id !== id))
      }
    } else {
      //Instructions for all uniterable elements
        props = {
          id,
          value,

          // CHANGED
          // OnBlur function removed so as to not constantly handleUpdate
          onChange: e => {
            //If element is sent with a target
            //This is in case data is sent as a value on its own and not as a whole element
            if(e.target){
              handleChange(e.target.value)
            }
            else{
              //If element is not sent with a target
              //If data is sent as a value on its own and not as a whole element 
              handleChange(e)
            }
          }
        }
      }
      return (
       // Passes props to children function
        <div className="Form-Group">
          <div className="Form-Label">{label}</div>
            {children(props)}
        </div>
      )
  }


  render() {
    //Calls Input function
    const { Input } = this

    //Sets constants from the state for readability
    const {isLoading, errMsg, updateMsg} = {...this.state}

    // Sets a static list of options for movie release years
    const options = Array(2020 - 2010 + 1).fill().map((item, index) => 2010 + index)

    return (

      <React.Fragment>
      {/* Sets loading screen until data is found*/}
      {isLoading === true ?
        <div className="Form">
          Fetching Data... <br />
          <img alt="loader" src ={ require('../src/images/preload.gif')}/>			     
        </div>
      :
      //If finished loading
      <div className="Form">
        {/* Displays error message */}
        {errMsg !== '' ?
          <div className="errMsg">
            {errMsg}
          </div>
        //  Displays updating message
       : updateMsg !== '' &&
        <div className="updateMsg">
          {updateMsg}
        </div>
        }
        {/* Form for adding a new movie to data */}
        <Input label="Title" id="title">
          {props => <Text {...props} />}
        </Input>
        <Input label="Upcoming" id="upcoming">
          {props => <Checkbox {...props} />}
        </Input>
        <Input label="Description" id="description">
          {props => <Textarea {...props} />}
        </Input>
        <Input label="Cast" iterable id="cast">
          {props => <Repeatable {...props} />}
        </Input>
        <Input label="Rating" id="rating">
          {props => <Rating {...props} />}
        </Input>
        <Input label="Release Year" id="year">
          {props => <Select {...props} options = {options} />}
        </Input>
        {/* Post data to api */}
        <button onClick={() => this.handleUpdate(true)}>
          {'Publish'}
        </button>
      </div>
      }
      </React.Fragment>
    )
  }
}

export default App
