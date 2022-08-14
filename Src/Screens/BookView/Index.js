import { StyleSheet,PermissionsAndroid,Platform, Text,Alert,FlatList, View,ScrollView,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
// import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
const Index = ({navigation}) => {



  const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpgdownload_pdf_url';

  const checkPermission = async () => {
    
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error','Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
      }
    }
  };

  const downloadFile = () => {
   
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;    
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);
   
    file_ext = '.' + file_ext[0];
   
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir+
          '/file_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,   
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
             /[^.]+$/.exec(fileUrl) : undefined;
  };



  //usestates
const [data,setdata]=useState([]);
const fetchdata=()=>{
  fetch('https://apis.yojad.ma/wp-json/wp/v2/livre', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
          .then((responseJson) => {
            setdata(responseJson);
            //  Alert.alert(JSON.stringify(responseJson));
          }).catch((error) => {
            console.error(error);
          });
}
useEffect(() => {
fetchdata();
}, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
         <View style={{ flexDirection: 'row', justifyContent:'space-between',alignItems: 'center', borderColor: '#D6CEC0', borderWidth: 2, backgroundColor: '#0d6efd', height: '6%' }}>

<TouchableOpacity style={{ paddingLeft: '4%' }} onPress={() => navigation.openDrawer()}>
  <Ionicons name="reorder-three-outline" size={29} color="black" />
</TouchableOpacity>
<View style={{}}>
  <Text style={{ fontWeight: '700', letterSpacing: 2, fontSize: 15, color: 'white' }}>BOOK VIEW</Text>
</View>
<TouchableOpacity style={{paddingRight:10}}>
<Ionicons name="ios-share-social" size={24} color="black" />
</TouchableOpacity>
</View>
    




      {/* <ScrollView> */}
      
         {/* FlatList DATA */}
     <FlatList data={data} renderItem={({ item }) => (
      //  <View style={{marginTop:'2%',height:'100%',width:'100%',alignSelf:'center'}}>
      <View style={{marginTop:'5%',padding:10,width:'100%',alignSelf:'center'}}>
        <Image source={require('../../../assets/book.png')} style={{width:'100%',height:360}}/>
        <View style={{alignSelf:'center',marginTop:'5%',alignItems:'center'}}>
          <Text style={{fontSize:25}}>{item.title.rendered}</Text>
          <View style={{width:'91%'}}>
          <Text style={{fontSize:15,color:'grey'}}>Discription:{item.content.rendered}</Text>
          </View>
  <View style={{borderWidth:0.3,width:500,borderColor:'black',marginTop:'3%'}}/>
       <View style={{paddingTop:'3%'}}>
        <Text>Author:{item.custom.childof_author.name}</Text>
       </View>
       <View style={{borderWidth:0.3,width:500,borderColor:'black',marginTop:'3%'}}/>
       <View style={{paddingTop:'3%'}}>
        <Text>Category:{item.custom.childof_category.name}</Text>
       </View>
       <View style={{borderWidth:0.3,width:500,borderColor:'black',marginTop:'3%'}}/>
       <View style={{paddingTop:'3%'}}>
        <Text>Publisher: {item.date_gmt}</Text>
       </View>
       <View style={{borderWidth:0.3,width:500,borderColor:'black',marginTop:'3%'}}/>
      
        </View>
        <TouchableOpacity  onPress={checkPermission} style={styles.DOWNLOADBUTTON}>
<Text style={{color:'white'}}>DOWNLOAD PDF</Text>
      </TouchableOpacity>
        </View>
        )}/>
        {/* <View style={{marginTop:'5%',alignItems:'center',backgroundColor:'#ffc009',width:'100%',height:70}}>
     <Text style={{fontSize:16,paddingTop:'3%'}}>Related Posts</Text>
        </View> </View>*/}
      
           
        <View style={{marginTop:'5%',alignItems:'center',backgroundColor:'#ffc009',width:'100%',height:45}}>
     <Text style={{fontSize:16,paddingTop:'3%'}}>Related Posts</Text>
        </View>
      
      {/* </ScrollView> */}
   
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#FFF'
      },
      DOWNLOADBUTTON:{
        height:30,
        width:'40%',
        backgroundColor:'#0d6efd',
        alignSelf:'center',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5%'
      }
})