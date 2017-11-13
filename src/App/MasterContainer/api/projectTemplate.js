import RandomID from 'random-id'

export default {
  _id: '0b',
  userId: '1a',
  projectTitle: 'Your Project Title',
  filteredCardLanes: [],
  lanes: [
    {
      laneTitle: 'Planned',
      cards: [
        {
          type: 'bug',   
          complexity: 3,        
          id: RandomID(),        
          cardNumber: 108,        
          title: 'DUMMY',
          summary: 'just some placeholder text',
          isPlaceholderCard: true
        },
        {
          type: 'bug',    
          complexity: 1,        
          id: RandomID(),   
          cardNumber: 106,        
          title: 'in testing card 2',
          summary: 'summary for in testing card 2'
        }
      ]
    },
    {
      laneTitle: 'In Dev',
      cards: [
        {
          type: 'bug',   
          complexity: 3,        
          id: RandomID(),        
          cardNumber: 108,        
          title: 'DUMMY',
          summary: 'just some placeholder text',
          isPlaceholderCard: true
        }
      ]
    },
    {
      laneTitle: 'In Testing',
      cards: [
        {
          type: 'bug',   
          complexity: 3,        
          id: RandomID(),        
          cardNumber: 108,        
          title: 'DUMMY',
          summary: 'just some placeholder text',
          isPlaceholderCard: true
        }
      ]
    },
    {
      laneTitle: "Done",
      cards: [
        {
          type: 'bug',   
          complexity: 3,        
          id: RandomID(),        
          cardNumber: 108,        
          title: 'DUMMY',
          summary: 'just some placeholder text',
          isPlaceholderCard: true
        }
      ]
    }
  ]
}
