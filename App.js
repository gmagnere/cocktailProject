import { StatusBar } from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, Modal, Pressable} from 'react-native';
import {useEffect, useState} from "react";


export default function App() {
  const [icon, setIcon] = useState(null);

  const [cocktail, setCocktail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const getCocktail = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(response => response.json())
        .then(data => {
          console.log(data);
              setCocktail(data.drinks);
            }
        )
  }

    useEffect(() => {

        (async () => {
            getCocktail()
        })();

    }, []);

    const Item = ({title}) => (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Description</Text>
                        <Text style={styles.modalText}>{title.strInstructions}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Fermer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.item}>
                <Image style={styles.tinyLogo} source={{uri: title.strDrinkThumb}}/>
                <Text style={styles.title}>{title.strDrink}</Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => setModalVisible(true)} ><Item title={item} /></TouchableOpacity>
    );

  return (
      <SafeAreaView style={styles.container}>
          <FlatList  numColumns={2} data={cocktail} renderItem={renderItem}/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1773F0',
        color:'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 120,
        height: 120,
        borderRadius:4
    },
    title: {
        fontSize: 18,
        marginTop:15,
        textAlign:'center',
    },
    item: {
        backgroundColor: '#D0CAB5',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
