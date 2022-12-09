import { Injectable } from '@nestjs/common';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

@Injectable()
export class TicketsService {
  async getAllTickets() {
    const tempTickets = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'tickets'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        const objTicket = {
          id: doc.id,
          ...doc.data(),
        };
        tempTickets.push(objTicket);
      });
    } catch (error) {
      console.log(error);
    }
    return tempTickets;
  }

  async getTicket(id: string) {
    let tempTicket;
    try {
      const querySnapshot = await getDocs(collection(db, 'tickets'));
      querySnapshot.forEach((doc) => {
        const objTicket = {
          id: doc.id,
          ...doc.data(),
        };
        if (id == objTicket.id) tempTicket = objTicket;
      });
    } catch (error) {
      console.log(error);
    }
    console.log(tempTicket);
    return tempTicket;
  }

  async insertTicket(
    merk: string,
    jenis: string,
    asal: string,
    tujuan: string,
    harga: number,
    jumlah: number,
    waktuasal: number,
    waktutujuan: number,
    user: string,
    username: string,
  ) {
    try {
      const tempTicket = {
        merk: merk,
        jenis: jenis,
        asal: asal,
        tujuan: tujuan,
        harga: harga,
        jumlah: jumlah,
        waktuasal: waktuasal,
        waktutujuan: waktutujuan,
        user: user,
        username: username,
      };
      await setDoc(doc(collection(db, 'tickets')), tempTicket);
      return 'ticket successfully inserted';
    } catch (error) {
      console.log(error);
    }
  }

  async updateTicket(
    id: string,
    merk: string,
    jenis: string,
    asal: string,
    tujuan: string,
    harga: number,
    jumlah: number,
    waktuasal: number,
    waktutujuan: number,
    user: string,
    username: string,
  ) {
    try {
      const tempTicket = {
        merk: merk,
        jenis: jenis,
        asal: asal,
        tujuan: tujuan,
        harga: harga,
        jumlah: jumlah,
        waktuasal: waktuasal,
        waktutujuan: waktutujuan,
        user: user,
        username: username,
      };
      await setDoc(doc(db, 'tickets', id), tempTicket);
      return 'ticket successfully edited';
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTicket(id: string) {
    try {
      await deleteDoc(doc(db, 'tickets', id));
      return 'ticket successfully deleted';
    } catch (err) {
      console.log(err);
    }
  }
}
