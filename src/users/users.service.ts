import { Injectable } from '@nestjs/common';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
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
    return tempUser;
  }

  async register(username: string, password: string) {
    try {
      const tempUser = {
        username: username,
        password: password,
      };
      await setDoc(doc(collection(db, 'users')), tempUser);
      return 'new user successfully registered';
    } catch (error) {
      console.log(error);
    }
  }

  async checkUser(username: string) {
    try {
      let tempUser;
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        const objUser = {
          id: doc.id,
          username: doc.data().username,
          ...doc.data(),
        };
        if (objUser.username == username) tempUser = objUser;
      });
      return tempUser;
    } catch (error) {
      console.log(error);
    }
  }
}
