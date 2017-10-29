import RandomID from 'random-id'
import projectTemplate from './projectTemplate'
// import userTemplate from './userTemplate'

/**
 * Object Stores:
 *
 * 1. Users - profile data
 * Schema:
 *  {
 *    _id: '0a',
 *    username: 'stephen',
 *    created: new Date().getTime()
 *    projects: ['0b']
 *  }
 *
 * 2. Projects - project data objects
 * Schema:
 * {
 *   _id: '0b',
 *   projectTitle: 'Your Project Title',
 *   filteredCardLanes: [],
 *   lanes: [
 *     {
 *       laneTitle: 'Planned',
 *       cards: []
 *     },
 *     {
 *       laneTitle: 'In Dev',
 *       cards: []
 *     },
 *     {
 *       laneTitle: 'In Testing',
 *       cards: [
 *         {
 *           type: 'userStory',
 *           complexity: 2,
 *           _id: '5f',
 *           cardNumber: 105,
 *           title: 'in testing card 1',
 *           summary: 'summary for in testing card 1',
 *           // array of data file id's for this card
 *           files: ['2a', '3a', '4b']
 *         }
 *       ]
 *     },
 *     {
 *       laneTitle: "Done",
 *       cards: []
 *     }
 *   ]
 * }
 *
 * 3. Files - files associated with user projects
 * Schema:
 *  {
 *    _id: '2a',
 *    projectID: '0b',
 *    cardID: '5f',
 *    dataType: 'data:image/png;base64,'
 *    name: 'someImage.png'
 *    data: 'bas64 string here'
 *  }
*/


const Api = {

  _init() {
    if (!window.indexedDB) {
      alert('your browser does not support IndexedDb')
      return false
    }
    this.db = undefined
    return this
  },

  _openRequest(action, storeName = 'user') {
    // initialize transaction with opening of request
    console.warn('_openRequest:', {storeName})
    const openRequest = indexedDB.open('react-kanban-board', 1)
    openRequest.onupgradeneeded = function(e) {
      this.db = e.target.result
      // adding tables of 'user', 'projects', 'files'
      if (!this.db.objectStoreNames.contains('user')) {
        this.db.createObjectStore('user', {keyPath: '_id'})
      }
      if (!this.db.objectStoreNames.contains('projects')) {
        this.db.createObjectStore('projects', {keyPath: '_id'})
      }
      if (!this.db.objectStoreNames.contains('files')) {
        this.db.createObjectStore('files', {keyPath: '_id'})
      }
    }
    openRequest.onsuccess = function (e) {
      // assumes the requisite stores exist here
      return new Promise((resolve, reject) => {
        this.db = e.target.result
        const transaction = this.db.transaction(storeName, 'readwrite')
        const store = transaction.objectStore(storeName)
        // API CRUD-style action here
        resolve(action(this.db, store))
      })
        .catch(err => console.warn('caught err:', { err }))
      
    };
    openRequest.onerror = function(e) {
      // catch error on opening request to start transaction
      console.error({ e })
    }
  },

  createUser({ username, email }, onError, onSuccess) {
    Api._openRequest((db, store) => {
      // getUser here
      // get all documents in store

      if (!username || !email) {
        throw new Error('no username or email entered')
      }

      const userProfile = {
        _id: RandomID(),
        username,
        email,
        created: new Date().getTime(),
        projects: []
      }
      
      const createUserRequest =  store.add(userProfile)

      createUserRequest.onerror = onError
      createUserRequest.onsuccess = onSuccess
    }, 'user')
  },
  getUser(onError, onSuccess) {
    // assumes the desired user is the one with *this* browser
    // var transaction = db.transaction(['user'], 'readwrite');
    // var store = transaction.objectStore('user');
    Api._openRequest((db, store) => {
      // getUser here
      // get all documents in store
      const getAllRequest = store.getAll()

      getAllRequest.onerror = onError
      getAllRequest.onsuccess = onSuccess
    }, 'user')

  },

  // manage the user object in state, then call this with it
  updateUser(userProfile, onError, onSuccess) {
    console.log('updateUser')
    Api._openRequest((db, store) => {

      if (!userProfile) {
        return undefined
      }
      const updateUserReqeust = store.put(userProfile)
      // store.put(item);

      updateUserReqeust.onerror = onError
      updateUserReqeust.onsuccess = onSuccess
    }, 'user')
  },

  deleteUser({ _id }, onError, onSuccess) {
    console.log('deleteUser')
    Api._openRequest((db, store) => {
      // getUser here
      // get all documents in store
      const getAllReqeust = store.delete(_id)

      getAllReqeust.onerror = onError
      getAllReqeust.onsuccess = onSuccess
    }, 'user')

  },

  createUserProject(onError, onSuccess) {
    // TODO: work on a subset of the project data of a user document...
    console.log('createNewUserProject')
    Api._openRequest((db, store) => {
      // getUser here
      // get all documents in store
      const nextProject = { ...projectTemplate }

      nextProject._id = RandomID()

      const createUserProjectRequest = store.add(nextProject)

      createUserProjectRequest.onerror = onError
      createUserProjectRequest.onsuccess = onSuccess
    }, 'projects')
  },

  getUserProject(onError, onSuccess) {
    // TODO: work on a subset of the project data of a user document...
    console.log('getUserProject')
    Api._openRequest((db, store) => {
      // getUser here
      // get all documents in store
      const getAllReqeust = store.getAll()

      getAllReqeust.onerror = onError
      getAllReqeust.onsuccess = onSuccess
    }, 'projects')
  },
  

  updateUserProject({ _id }, onError, onSuccess) {
    // TODO: work on a subset of the project data of a user document...
    console.log('updateUserProject')
    Api._openRequest((db, store) => {
      // getUser here
      // get all documents in store
      const data = {}
      const getAllReqeust = store.put(data, _id)

      getAllReqeust.onerror = onError
      getAllReqeust.onsuccess = onSuccess
    }, 'projects')
  },


  deleteUserProject({ _id }, onError, onSuccess) {
    // TODO: work on a subset of the project data of a user document...
    console.log('deleteUserProject')
    Api._openRequest((db, store) => {
      // getUser here
      // get all documents in store
      const getAllReqeust = store.delete(_id)

      getAllReqeust.onerror = onError
      getAllReqeust.onsuccess = onSuccess
    }, 'projects')
  }
}

const api = Api._init()
// for testing
window.api = api

export default api
