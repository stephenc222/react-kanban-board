import React from 'react'
import './index.css'

const dummyProjects = [
  {
    filteredCardLanes: [],
    lanes: [
      {
        laneName: 'Todo',
        cards: [
          {},
          {},
          {},
        ]
      },
      {
        laneName: 'In Progress',
        cards: [
          {},
          {},
          {},
        ]
      },
      {
        laneName: 'Done',
        cards: [
          {},
          {},
          {},
        ]
      },
    ],
    projectTitle: "Project Name 1",
    lastUpdated: '11/17/2017 4:00 pm CST',
    userId: "w0C99CHpyweG8AOEJeQPW06npqvZfb",
    _id: "6FgL1IlYwX2LSudhM5Jo1HRCAZB4BV"
  },
  {
    filteredCardLanes: [],
    lanes: [
      {
        laneName: 'Todo',
        cards: [
          {},
          {},
          {},
        ]
      },
      {
        laneName: 'In Progress',
        cards: [
          {},
          {},
          {},
        ]
      },
      {
        laneName: 'Done',
        cards: [
          {},
          {},
          {},
        ]
      },
    ],
    projectTitle: "Project Name 2",
    lastUpdated: '11/17/2017 4:00 pm CST',
    userId: "w0C99CHpyweG8AOEJeQPW06npqvZfb",
    _id: "6FgL1IlYwX2LSudhM5Jo1HRCAZB4BV"
  },
  {
    filteredCardLanes: [],
    lanes: [
      {
        laneName: 'Todo',
        cards: [
          {},
          {},
          {},
        ]
      },
      {
        laneName: 'In Progress',
        cards: [
          {},
          {},
          {},
        ]
      },
      {
        laneName: 'Done',
        cards: [
          {},
          {},
          {},
        ]
      },
    ],
    projectTitle: "Project Name 3",
    lastUpdated: '11/17/2017 4:00 pm CST',
    userId: "w0C99CHpyweG8AOEJeQPW06npqvZfb",
    _id: "6FgL1IlYwX2LSudhM5Jo1HRCAZB4BV"
  },
  {
    filteredCardLanes: [],
    lanes: [
      {
        laneName: 'Todo',
        cards: [
          {},
          {},
          {},
        ]
      },
      {
        laneName: 'In Progress',
        cards: [
          {},
          {},
          {},
        ]
      },
      {
        laneName: 'Done',
        cards: [
          {},
          {},
          {},
        ]
      },
    ],
    projectTitle: "Project Name 4",
    lastUpdated: '11/17/2017 4:00 pm CST',
    userId: "w0C99CHpyweG8AOEJeQPW06npqvZfb",
    _id: "6FgL1IlYwX2LSudhM5Jo1HRCAZB4BV"
  }
]

const DashboardView = (props) => {

  const renderProjectItemLanes = (lane, index) => {
    return (
      <div key={index} className='project-list-item-lane-item-container'>
        <div className='project-list-item-lane-status-container'>
          <div className='project-list-item-lane-card-count-text'>7</div>
          <div className={`project-list-item-lane-name-text project-list-item-lane-name-text--palette${index + 1}`}>{lane.laneName}</div>
        </div>
      </div>
    )
  }

  const renderProjectItem = (project, index) => {
    return (
      <div key={index} className='project-list-item'>
        <div className='project-list-item-header-container'>
          <div className='project-list-item-project-name-text'>{project.projectTitle}</div>
          <div className='project-list-item-last-status-change-container'>
            <div className='project-list-item-last-status-change-text'>Last change in status:</div>
            <div className='project-list-item-last-status-change-date'>{project.lastUpdated}</div>
          </div>
        </div>
        
        <div className='project-list-item-lanes-container'>
          { project.lanes.map(renderProjectItemLanes)}
        </div>
      </div>
    )
  }

  return (
    <div className='app-container'>
      <div className='project-list-container'>
        <div className='project-list-header-container'>
          <div className='project-list-header-text'>My Projects</div>
          <div className='project-list-header-project-count'>{dummyProjects.length}</div>    
        </div>
        <div className='project-toolbar-container'>
          <button className='new-project-button'>➕ Project</button>
        </div>
        <div className='project-list-items-container'>
          <div>
            { dummyProjects.map(renderProjectItem)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView