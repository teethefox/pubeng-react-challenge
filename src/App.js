import React from 'react'
import { Checkbox, Repeatable, Text, Textarea, Select, Rating } from './components'
import api from './mockApi'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: {
        title: '',
        rating: 0,
        year: null,
        description: '',
        upcoming: false, 
        cast: [], 
        
      }
    }
  }
  componentDidMount() {
    const props = {...this.props}
    if(props.id) {
      api.get(props.id)
        .then((data) => {   

          this.setState({isLoading: false, data: data})
        })
        // Invalid ID
        .catch((data) => {
          this.setState({isLoading: false})
        })
    } else {
      this.setState({isLoading: false})
    }
  }


  /**
   * 
   */
  handleChange = (delta) => {
    this.setState(({ data }) => ({ data: { ...data, ...delta }}))
  }

  /**
   * 
   */
   handleUpdate = async (publish = false) => {
    const { data } = this.state
    const results = await api.post({ ...data, publish })
    console.log('Content updated!')
    return results
  }

  /**
   * 
   */
  Input = ({ children, iterable, label, id }) => {
    const handleChange = value => {
      this.handleChange({ [id]: value })
    }
    const value = this.state.data[id]
    let props = {}

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
      props = {
        id,
        value,
        onBlur: () => this.handleUpdate(false),
        onChange: e => {

        if(e.target){
        handleChange(e.target.value)
        }
        else{
          handleChange(e)
        }
      }
      }
    }
    return (
      <div className="Form-Group">
        <div className="Form-Label">{label}</div>
        {children(props)}
      </div>
    )
  }


  render() {
    const { Input } = this
    const {isLoading} = {...this.state}
    const options = Array(2020 - 2010 + 1).fill().map((item, index) => 2010 + index)
    return (
     <React.Fragment>
        {isLoading === true ?
           <div className="Form">
     Fetching Data... <br />
     <img alt="loader" src ={ require('../src/images/preload.gif')}/>			     

         </div>

    :
      <div className="Form">
     
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
