import { Injectable } from '@nestjs/common';
import {
  collection,
  getDocs,
  // doc,
  // setDoc,
  // deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export type User = any;

@Injectable()
export class UsersService {
  async findOne(username: string) {
    let tempUser;
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        const objUser = {
          id: doc.id,
          username: doc.data().username,
          ...doc.data(),
        };
        if (objUser.username == username) tempUser = objUser;
      });
    } catch (error) {
      console.log(error);
    }
    console.log(tempUser);
    return tempUser;
  }
}
