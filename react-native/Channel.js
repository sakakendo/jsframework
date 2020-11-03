import React, {Component} from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

const baseUrl = "https://us-central1-demoapp-1779c.cloudfunctions.net/v1";

type Message = {
  id: int, 
  body: string,
  user: {
    id: long,
    name: string,
    avatar: string,
  }
}

type State = {
  messages: Array<Message>,
  messageBody: string,
}

const MessageCell = (props: Messages) =>
  <View style={styles.message}>
    <View style={styles.messageText}>
      <View style={styles.messageAbout}>
        <Text>{props.message.user.name}</Text>
        <Text>{props.message.date}</Text>
      </View>
      <Text style={styles.messageBody}>{props.message.body}</Text>
    </View>
  </View>;

export default class Channel extends Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      messageBody: ""
    };
  }

  componentDidMount(){
    console.log(this.props)
    this.fetchMessages();
  }

  fetchMessages(){
    fetch(baseUrl + `/channels/${this.props.route.name}/messages`)
      .then((res)=>res.json())
      .then((json)=>this.setState({messages: json.messages}))
      .then(console.log(this.state.messages))
      .catch((err)=>console.log(err));
  }

  postMessage(){
    const payload: PostMessage = {body: this.state.messageBody};
    fetch(baseUrl + `/channels/${this.props.route.name}/messages`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(res=>{
        this.fetchMessages();
        this.setState({messageBody: ''});
      })
      .catch(err=>console.log(err));
  }

  render(){
    console.log(this.state, this.state.messageBody, this.state.messageBody.length)
    return(
      <View style={styles.container}>
        <FlatList 
          style={styles.list}
          data={this.state.messages.slice().reverse()}
          keyExtractor={(item, index) => item.id}
          renderItem={({item})=> <MessageCell message={item} />} />
        <View style={styles.action}>
          <TextInput
            style={styles.actionInputText}
            placeholder='Message #general'
            onChangeText={(text)=>this.setState({messageBody: text})}
            value={this.state.messageBody} />
          <Button
            title='Send'
            onPress={()=>this.postMessage()} 
            disabled={this.state.messageBody.length === 0} />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    justifyContent: 'flex-start',
  },
  list: {
    flex: 1,
  },
  message: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    height: 72,
    paddingTop: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  messageText: {
    flex: 1
  },
  messageAbout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 2,
  },
  messageBody:{
    fontSize: 14
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    paddingTop: 20
  },
  actionInputText: {
    flex: 1,
    paddingLeft: 16
  }
});

