/*import MenuDrawer from 'react-native-side-drawer';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';

export default class TAB1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dataSource: [],
    };
  }
  toggleOpen = () => this.setState({open: !this.state.open});

  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Text style={{color: '#000000', marginTop: 100, fontWeight: 'bold'}}>
          BIENVENIDO:{this.props.route.params.nombre}
        </Text>
        <TouchableOpacity onPress={this.toggleOpen}>
          <Text style={{marginTop: 550, marginRight: 120, color: 'black'}}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  componentDidMount() {
    _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        console.log(xhttp.responseText);
        var Temporal = JSON.parse(xhttp.responseText);
        _this.setState({dataSource: Temporal});
      }
    };
    xhttp.open('GET', 'https://cuceimobile.space/datos.json', true);
    xhttp.send();
  }
  render() {
    return (
      <View style={styles.container}>
        <MenuDrawer
          open={this.state.open}
          position={'left'}
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}>
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Image
              source={require('./Imagenes/TresLineas.png')}
              style={{width: 50, height: 50}}></Image>
          </TouchableOpacity>
        </MenuDrawer>
        <View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <View style={{height: 150, width: 200}}>
                <Text style={styles.textonegro}>{item.Nombre}</Text>
                <Text style={styles.textonegro}>{item.Profesion}</Text>
                <Text style={styles.textonegro}>{item.Telefono}</Text>
                <Text style={styles.textonegro}>{item.Imagen}</Text>
                <View
                  style={{
                    height: 5,
                    width: 300,
                    backgroundColor: 'gray',
                  }}></View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    zIndex: 0,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: '#DE9F68',
    padding: 10,
  },
  body: {
    flex: 1,
    backgroundColor: 'FFFFFF',
    marginBottom: 570,
    marginLeft: 340,
  },
  textonegro: {
    color: 'black',
  },
});*/