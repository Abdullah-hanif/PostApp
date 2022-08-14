import { StyleSheet, Text, View,Alert, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
const Index = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Kela', value: 'kela' },
    { label: 'Khakli', value: 'khali' },

  ]);

  // author categories
  const [isOpen, setIsOpen] = useState(false);
  const [valueAuthor, setValueAuthor] = useState(null);
  const [itemsAuthor, setItemsAuthor] = useState([
    { label: 'Bable', value: 'babel' },
    { label: 'Charlee', value: 'charlee' },
    { label: 'Antom', value: 'antom' },
    { label: 'Lili', value: 'lili' },

  ]);
  const [cat,setcat]=useState('');
  const [aut,setaut]=useState('');
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
    <SafeAreaView style={styles.mainContainer}>
     <View style={{ flexDirection: 'row', justifyContent:'space-between',alignItems: 'center', borderColor: '#D6CEC0', borderWidth: 2, backgroundColor: '#0d6efd', height: '6%' }}>

<TouchableOpacity style={{ paddingLeft: '4%' }} onPress={() => navigation.openDrawer()}>
  <Ionicons name="reorder-three-outline" size={29} color="black" />
</TouchableOpacity>
<View style={{}}>
  <Text style={{ fontWeight: '700', letterSpacing: 2, fontSize: 15, color: 'white' }}>HOME</Text>
</View>
<TouchableOpacity style={{paddingRight:10}}>
<Ionicons name="ios-share-social" size={24} color="black" />
</TouchableOpacity>
</View>
      <View style={{ marginTop: '5%' }}>
        <View style={{ alignSelf: 'center' }}>
          <Text style={{ fontSize: 12 }}>Filter Post By Post Category</Text>
        </View>
        <DropDownPicker
          style={{ borderColor: 'grey', height: '10%', width: '95%', marginTop: '2%', borderWidth: 0.8, alignSelf: 'center' }}
          maxHeight={50}

          open={open}
          value={value}
          items={data.map(item=>({label:item.name,value:item.name}))}
          setOpen={setOpen}
          setValue={setValue}
         //setItems={setItems}
         onSelectItem={(item) => {
          setcat(item);
          }}
          onChangeValue={(value) => {
            setcat(value);
        }
     }  
        />
      </View>

      {/* author values */}
      <View style={{ marginTop: '2%' }}>
        <View style={{ alignSelf: 'center' }}>
          <Text style={{ fontSize: 12 }}>Filter  Post By Author</Text>
        </View>
        <DropDownPicker
          style={{ borderColor: 'grey', height: '10%', width: '95%', marginTop: '2%', borderWidth: 0.8, alignSelf: 'center' }}
          maxHeight={50} 
          open={isOpen}
          value={valueAuthor}
          items={data1.map(item=>({label:item.name,value:item.name}))}
          setOpen={setIsOpen}
          setValue={setValueAuthor}
          //setItems={setItemsAuthor}
          onSelectItem={(item) => {
            setaut(item);
            }}
            onChangeValue={(value) => {
              setaut(value);
          }
       }  
        />
      </View>
    </SafeAreaView>
  )
}
export default Index

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFF'
  },
  shadow: {
    backgroundColor: "#FAF9F6",
    width: "36%",
    height: "100%",
    alignItems: "center",
    borderRadius: 15,

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  }
})