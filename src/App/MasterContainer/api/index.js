import RandomID from 'random-id'
import projectTemplate from './projectTemplate'

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

  _openRequest(storeName, action) {
    // initialize transaction with opening of request
    const openRequest = indexedDB.open('react-kanban-board', 1)
    openRequest.onupgradeneeded = function(e) {
      this.db = e.target.result
      // adding tables of 'user', 'projects', 'files'
      if (!this.db.objectStoreNames.contains('user')) {
        this.db.createObjectStore('user', { keyPath: '_id' })
        
      }
      if (!this.db.objectStoreNames.contains('projects')) {
        this.db.createObjectStore('projects', {keyPath: '_id'})
      }
      if (!this.db.objectStoreNames.contains('files')) {
        this.db.createObjectStore('files', {keyPath: '_id'})
      }
    }
    openRequest.onsuccess = (e) => {
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
    openRequest.onerror = (e) => {
      // catch error on opening request to start transaction
      console.error({ e })
    }
  },

  createUser({ email, password }) {
    return new Promise((resolve, reject) => {
      Api._openRequest('user', (db, store) => {

        if (!email || !password) {
          return reject(new Error('no email or password entered'))
        }
  
        const userProfile = {
          _id: RandomID(),
          password,
          email,
          created: new Date().getTime(),
          projects: []
        }
        
        const createUserRequest =  store.add(userProfile)
  
        createUserRequest.onerror = (e) => reject(e)
        createUserRequest.onsuccess = (e) => resolve(e)
      })
    }) 
  },
  getUser() {
    // assumes the desired user is the one with *this* browser
    return new Promise((resolve, reject) => {
      Api._openRequest('user',(db, store) => {

        const getAllRequest = store.getAll()

        getAllRequest.onerror = (e) => reject(e)
        getAllRequest.onsuccess = (e) => resolve(e)
      })
    })  

  },

  // manage the user object in state, then call this with it
  updateUser({ userProfile }) {
    return new Promise((resolve, reject) => {
      Api._openRequest('user', (db, store) => {
  
        if (!userProfile) {
          return undefined
        }
        const updateUserRequest = store.put(userProfile)
  
        updateUserRequest.onerror = (e) => reject(e)
        updateUserRequest.onsuccess = (e) => resolve(e)
      })
    })
  },

  removeUser({ _id }) {
    return new Promise((resolve, reject) => { 
      Api._openRequest('user',(db, store) => {

        const getAllRequest = store.delete(_id)
  
        getAllRequest.onerror = (e) => reject(e)
        getAllRequest.onsuccess = (e) => resolve(e)
      })
    })

  },

  createUserProject({ nextProjectId, userId }) {
    return new Promise((resolve, reject) => {
      Api._openRequest('projects',(db, store) => {

        const nextProject = { ...projectTemplate }

        nextProject._id = nextProjectId
        nextProject.userId = userId

        const createUserProjectRequest = store.add(nextProject)

        createUserProjectRequest.onerror = (e) => reject(e)
        createUserProjectRequest.onsuccess = (e) => resolve(e)
      })
    })  
  },

  getUserProject({ projectId }) {
    return new Promise((resolve, reject) => {
      Api._openRequest('projects',(db, store) => {

        const _id = projectId
        const getAllRequest = store.get(_id)
  
        getAllRequest.onerror = (e) => reject(e)
        getAllRequest.onsuccess = (e) => resolve(e)
      })
    }) 
  },

  getAllUserProjects({ userId }) {
    return new Promise((resolve, reject) => {
      Api._openRequest('projects',(db, store) => {
        const getAllRequest = store.getAll()
        getAllRequest.onsuccess = (e) => {
          const projectsStore = e.target.result
          const userProjects = projectsStore.filter(project => project.userId === userId)
          resolve(userProjects)
        }

        getAllRequest.onerror = (e) => reject(e)

      })
    })
  },
  

  updateUserProject({ project }) {
    return new Promise((resolve, reject) => {
      Api._openRequest('projects',(db, store) => {

        const getAllRequest = store.put(project)

        getAllRequest.onerror = (e) => reject(e)
        getAllRequest.onsuccess = (e) => resolve(e)
      })
    })  
  },


  removeUserProject({ _id }) {
    return new Promise((resolve, reject) => {
      Api._openRequest('projects',(db, store) => {

        const getAllRequest = store.delete(_id)

        getAllRequest.onerror = (e) => reject(e)
        getAllRequest.onsuccess = (e) => resolve(e)
      })
    })  
  }
}

const api = Api._init()

export default api
