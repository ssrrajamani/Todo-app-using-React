import './App.css';
import React from 'react';
import ListItems from './ListItems';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items:[],
      currentItem: {
        text: '',
        key: ''
      }
    }
    this.handleInput=this.handleInput.bind(this);
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.updateList=this.updateList.bind(this);
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    let newItem=this.state.currentItem;
    if(newItem.text!==""){
      const updatedItemList=[...this.state.items,newItem];
      this.setState({
        items:updatedItemList,
        currentItem:{
          text:"",
          key:""
        }
      })
    }
  }

  deleteItem(key){
    let filteredList=this.state.items.filter(
      item=>item.key!==key);
      this.setState({
        items:filteredList
      })
  }

  updateList(value,key){
    let items=this.state.items;
    items.map(
      item=>{
      if(item.key===key){
        item.text=value;
      }
    }
    )
    this.setState({
      items:items
    })
  }
  render() {
    return (
      <div className='App' >
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input type="text" value={this.state.currentItem.text} onChange={this.handleInput} placeholder='Enter the text here'></input>
            <button type="submit" >ADD</button>
          </form>
        
        <ListItems itemList={this.state.items} deleteItem={this.deleteItem} updateList={this.updateList}></ListItems>
        </header>
      </div>

    )
  }
}
export default App;
