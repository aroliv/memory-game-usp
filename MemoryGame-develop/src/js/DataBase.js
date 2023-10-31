import * as firebase from 'firebase/app'
import 'firebase/firebase-firestore'

export default class DataBase{
    constructor(totalClick, timeRemainig){
        this.firebaseConfig = {
            apiKey: "AIzaSyCgkd3XLWgqelYMjLoJlDsmSyAoN8t5P5A",
            authDomain: "memorygameusp.firebaseapp.com",
            projectId: "memorygameusp",
            storageBucket: "memorygameusp.appspot.com",
            messagingSenderId: "123230450792",
            appId: "1:123230450792:web:2c22e6c41654844ed877dd",
            measurementId: "G-VKB48EHBQB"

        };
        this.totalClick = totalClick;
        this.timeRemainig = timeRemainig;
        this.firebase = firebase;
        if (!this.firebase.apps.length) {
            this.firebase.initializeApp(this.firebaseConfig)
        }
        this.dataBase = this.firebase.firestore();
        this.nickName = document.getElementById('nickname');
        this.nickPodium = [...document.querySelectorAll('.score-list__nickname')];
        this.scorePodium = [...document.querySelectorAll('.score-list__points')];
        this.scoreList = document.querySelector('.score-list');
        this.podiumTable =[]

    }

    showNickName(){

        this.dataBase.collection('scores').add({
            nickname: `${this.nickName.value}`,
            score: (this.totalClick * (this.timeRemainig - 1))
        });

    }

    getData(){

        this.dataBase.collection('scores')
            .orderBy('score', "desc")
                .get()
                    .then((snapshot) => {
                        snapshot.docs.forEach((doc) => {
                        this.podiumTable.push(doc.data())
                        })
                    this.addDataToBoard(this.podiumTable)
                    })
    }

    addDataToBoard(podiumTable){

       this.nickPodium.forEach((e, i)=>{
            e.textContent = podiumTable[i].name
       });
       this.scorePodium.forEach((e, i)=>{
           e.textContent = `${podiumTable[i].score}pt`
       })

       for(let i = 3, j=1; i<10; i++, j++){
           const listItem = document.createElement('li');
           document.querySelector('.score-list').appendChild(listItem);
           listItem.classList.add('score-list__item');
           this.scoreToTen = [...document.querySelectorAll('.score-list__item')]
           this.scoreToTen[j].textContent = `${i+1}. ${podiumTable[i].name}  ${podiumTable[i].score}pt`
       }
    }
}