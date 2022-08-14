import {
  Dimensions,
  ImageBackground,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Image,
  BackHandler,
  ScrollView
} from "react-native"
const { width, height } = Dimensions.get("screen")
import { Ionicons } from '@expo/vector-icons';
import React, { useState,useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context'
const Index = ({ navigation }) => {
  // CATEGORIES 1
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: 'Apple', value: 'apple' },
  //   { label: 'Banana', value: 'banana' },
  //   { label: 'Kela', value: 'kela' },
  //   { label: 'Khakli', value: 'khali' },

  // ]);

  // categories 2
  const [isOpen, setIsOpen] = useState(false);
  const [valueAuthor, setValueAuthor] = useState(null);
  // const [itemsAuthor, setItemsAuthor] = useState([
  //   { label: 'Bable', value: 'babel' },
  //   { label: 'Charlee', value: 'charlee' },
  //   { label: 'Antom', value: 'antom' },
  //   { label: 'Lili', value: 'lili' },

  // ]);
  const [data,setdata]=useState([]);
  const [data1,setdata1]=useState([]);
  const fetchdata=()=>{
    fetch('https://apis.yojad.ma/wp-json/wp/v2/categories?parent=29&post_type=livre', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
            .then((responseJson) => {
              setdata(responseJson);
              // Alert.alert(JSON.stringify(responseJson));
            }).catch((error) => {
              console.error(error);
            });
  }
  const fetchdata1=()=>{
    fetch('https://apis.yojad.ma/wp-json/wp/v2/categories?parent=28&post_type=livre', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
            .then((responseJson) => {
              setdata1(responseJson);
              // Alert.alert(JSON.stringify(responseJson));
            }).catch((error) => {
              console.error(error);
            });
  }
  useEffect(() => {
  fetchdata();
  fetchdata1();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: '#F9F6F0', flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent:'space-between',alignItems: 'center', borderColor: '#D6CEC0', borderWidth: 2, backgroundColor: '#0d6efd', height: '6%' }}>

<TouchableOpacity style={{ paddingLeft: '4%' }} onPress={() => navigation.openDrawer()}>
  <Ionicons name="reorder-three-outline" size={29} color="black" />
</TouchableOpacity>
<View style={{}}>
  <Text style={{ fontWeight: '700', letterSpacing: 2, fontSize: 15, color: 'white' }}>List of Categories</Text>
</View>
<TouchableOpacity style={{paddingRight:10}}>
<Ionicons name="ios-share-social" size={24} color="black" />
</TouchableOpacity>
</View>
          {/* Categories 1 */}
      <View style={{ marginTop: '2%' }}>
        <View style={{ marginTop: '3%' }}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontSize: 12 }}>CATEGORIES 1</Text>
          </View>
          <DropDownPicker
            style={styles.DropDown1}
            maxHeight={50}
            zIndex={1}
            open={open}
            value={value}
            items={data.map(item=>({label:item.name,value:item.name}))}
            setOpen={setOpen}
            setValue={setValue}
            //setItems={setItems}
          />
        </View>

        {/* Categories 2 */}
        <View style={{ marginTop: '20%' }}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontSize: 12 }}>CATEGORIES 2</Text>
          </View>
          <DropDownPicker
            style={styles.DropDown2}
            maxHeight={50}

            open={isOpen}
            value={valueAuthor}
            items={data1.map(item=>({label:item.name,value:item.name}))}
            setOpen={setIsOpen}
            setValue={setValueAuthor}
            //setItems={setItemsAuthor}
          />
        </View>
      </View>


    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  CategoryContainerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    marginTop: '5%',
    alignItems: 'center'
  },

  CategoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: 'grey',
    width: '30%',
    height: 50,
    borderRadius: 5

  },

  Header: {
    flexDirection: 'row',
     alignItems: 'center',
      borderColor: '#D6CEC0', 
      borderWidth: 2, 
      backgroundColor: '#0d6efd',
       height: '6%'
  },
  DropDown1:{borderColor: 'grey',
   height: '10%',
    width: '80%', 
    marginTop: '1%', 
    borderWidth: 0.8,
     alignSelf: 'center'
     },

  DropDown2:{
    borderColor: 'grey',
   height: '10%',
    width: '80%', 
    marginTop: '2%', 
    borderWidth: 0.8, 
    alignSelf: 'center'
  }
})
