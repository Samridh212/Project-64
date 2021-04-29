import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import {Header}  from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TextInput} from 'react-native'
import dictionary from './localdb'

export default class App extends React.Component {
    constructor(){
      super();
      this.state={
        text:'',
        displayText:'',
        isSearchPressed: false,
        isLoading: false,
        word: 'Loading...', 
        lexicalCategory: '',
         definition: '',
      }
    }
    getWord =(text) =>{
      var text = text.toLowerCase()
      try{
        var word = dictionary[text] ["word"]
      var lexicalCategory = dictionary[text] ["lexicalCategory"]
      var definition = dictionary[text] ["definition"]
      this.setState({
        "word":word,
        "lexicalCategory":lexicalCategory,
        "definition":definition,
      })
      }
      catch(err){
        alert('Sorry this word is not available for now')
        this.setState({
          'text':'',
          'isSearchPressed':false
        })
      }
    
    }
  render() {
    return (
      <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          backgroundColor={'white'} 
          centerComponent={{text:'DICTIONARY APP', style:{color:'black',fontSize:30,backgroundColor:'white'}}}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.goButton}
        onPress={()=>{
          this.setState({
            displayText:this.state.text,
            isSearchPressed:true,
            isLoading: true,
          });
          this.getWord(this.state.text);
          }}>
           <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style = {styles.detailsTitle}>{this.state.displayText}</Text>

        <Text style={[styles.detailsTitle, {fontSize:25}]}>Word:{''}</Text>
        <Text style = {styles.detailsTitle}>{this.state.word}</Text>

        <Text style={[styles.detailsTitle ,{fontSize:25}]}>Type:{''}</Text>
        <Text style = {styles.detailsTitle}>{this.state.lexicalCategory}</Text>

        <Text style={[styles.detailsTitle,{fontSize:25}]}>Definition:{''}</Text>
        <Text style = {styles.detailsTitle}>{this.state.definition}</Text>
        

      </View>
      </SafeAreaProvider>
    );
  }
}
const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    textAlign: 'center',
    height: 40,
    alignSelf: 'center',
    borderWidth: 4,
    borderRadius:50,
    backgroundColor:'white',
    color:'#184A45FF',
    fontSize:30,
  },
  goButton:{
    marginTop: 50,
    textAlign: 'center',
    alignSelf: 'center',
    borderWidth: 4,
    borderRadius:50,
    width:150,
    height:50,
    backgroundColor:'white',
    borderColor:'#white'
   
  },
  buttonText: {
    marginTop: -1,
    textAlign: 'center',
    alignSelf: 'center',
    color:'#white',
    fontSize:30
  },
  detailsTitle:{
    color:"white",
  }
})