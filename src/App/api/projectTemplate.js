export default {
  _id: '0b',
  userId: '1a',
  projectTitle: 'Your Project Title',
  filteredCardLanes: [],
  lanes: [
    {
      laneTitle: 'Planned',
      cards: []
    },
    {
      laneTitle: 'In Dev',
      cards: []
    },
    {
      laneTitle: 'In Testing',
      cards: [
        {
          type: 'userStory',
          complexity: 2,
          _id: '5f',
          cardNumber: 105,
          title: 'in testing card 1',
          summary: 'summary for in testing card 1',
          // array of data file id's for this card
          files: ['2a', '3a', '4b']
        }
      ]
    },
    {
      laneTitle: "Done",
      cards: []
    }
  ]
}
