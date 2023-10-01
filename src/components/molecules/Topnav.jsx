'use client'
import React, { useState } from 'react'
import styles from './molecules.module.css'
import Back from '../atom/svgs/Back'
import Edit2 from '../atom/svgs/Edit2'
import Delete2 from '../atom/svgs/Delete2'
import firebase from '../../firebase/config';


const Topnav = ({ id, collection, where, deletion }) => {
    // console.log(id, collection, where);
    const [popUp, setPopUp] = useState(false);
    return (
        <>
            {popUp && <div className={styles.popUp}>
                <div className={styles.popUpContainer}>
                    <h1>Are you sure you want to delete this {deletion} ?</h1>
                    <div className={styles.btns}>
                        <button onClick={() => {
                            setPopUp(false)
                        }}>No</button>
                        <button onClick={() => {
                            firebase.firestore().collection(collection).where(where, '==', parseInt(id)).get().then((snapshot) => {
                                snapshot.docs.map((doc) => {
                                    firebase.firestore().collection(collection).doc(doc.id).delete().then(() => {
                                        setTimeout(() => {
                                            window.history.back()
                                        }, 1000);
                                        console.log('Document successfully deleted');
                                    }).catch((error) => {
                                        console.error('Error deleting document: ', error);
                                    });
                                });
                            }).catch((error) => {
                                console.error('Error fetching documents: ', error);
                            });
                            setPopUp(false)
                        }}>Yes</button>
                    </div>
                </div>
            </div>}

            <div className={styles.topnav}>
                <p onClick={
                    () => {
                        window.history.back()
                    }
                }><Back /> </p>
                <div className={styles.btns}>
                    <p><Edit2 /></p>
                    <p
                        onClick={() => {
                            setPopUp(true)
                        }}
                    ><Delete2 /></p>
                </div>
            </div>
        </>
    )
}

export default Topnav