import {firebase} from './firebase'

import {
    doc,
    query,
    onSnapshot,
    deleteDoc,
    addDoc,
    updateDoc,
    CollectionReference
} from 'firebase/firestore'
import {Ref, ref} from 'vue'

export class WhereClause {
    constructor(public field: string, public operator: any, public value: any) {
    }
}

export class OrderByClause {
    constructor(public field: string, public direction: any) {
    }
}

export function useFirestore<T>(refPath: string[]) {
    const collectionRef = firebase.createCollectionRef<T>(refPath)
    const collectionQuery = query(collectionRef as CollectionReference<T>)
    // const {db} = firebase

    const item = ref<T>()
    const items = ref<T[] | null>(null) as Ref<T[]>
    const itemLoaded = ref(false)
    const itemsLoaded = ref(false)

    let itemsSnapshot: any
    let itemSnapshot: any

    const init = async () => {
        await getItems()
    }

    const getItems = async () => {
        itemsLoaded.value = false
        if (itemsSnapshot) itemsSnapshot() // unsubscribe from any active listener
        itemsSnapshot = onSnapshot(collectionQuery, (itemSnapshot) => {
            const itms: T[] = []
            itemSnapshot.forEach((doc) => {
                const itm = {...doc.data(), id: doc.id} as T
                itms.push(itm)
            })
            items.value = itms
            itemsLoaded.value = true
        }, error => {
            console.log('error.message: ', error.message)
        })


    }

    const clearItems = async () => {
        await getItems()
    }

    const addItem = async (item: Partial<T>) => { 
        await addDoc(collectionRef as CollectionReference<T>, item as T)
    }

    const deleteItem = async (idToDelete: string) => {
        await deleteDoc(doc(collectionRef as CollectionReference, idToDelete))
    }

    const updateItem = async (id: string, partialItem: any) => {
        const foundItem = await doc(collectionRef as CollectionReference, id)
        await updateDoc(foundItem, partialItem)
    }

    const getItem = async (id: string) => {

        itemLoaded.value = false
        if (itemSnapshot) itemSnapshot() // unsubscribe from any active listener
        itemSnapshot = onSnapshot(doc(collectionRef as CollectionReference, id), (itemSnapshot) => {
            item.value = {...itemSnapshot.data(), id: itemSnapshot.id} as T;
        })
    }

    const totalItems = () => {
        return items.value.length
    }

    return {
        items,
        itemsLoaded,
        item,
        itemLoaded,
        init,
        getItems,
        clearItems,
        addItem,
        deleteItem,
        updateItem,
        getItem,
        totalItems,
    }
}
