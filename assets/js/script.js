// Variables
const mainEl = document.querySelector('main');
const navEl = document.querySelector('nav');
const periodEl = document.querySelector('select');
const statDisplayEl = document.createElement('section');

const metrics = [
  {
    "name": "field goal",
    "value": 2,
    "rollUp": "points",
    "side": [
      "offense"
    ],
    "context": [
      "fast break",
      "second chance",
      "in the paint"
    ]
  },
  {
    "name": "three pointer",
    "value": 3,
    "rollUp": "points",
    "side": [
      "offense"
    ],
    "context": [
      "fast break",
      "second chance"
    ]
  },
  {
    "name": "free throw",
    "value": 1,
    "rollUp": "points",
    "side": [
      "offense"
    ],
    "context": []
  },
  {
    "name": "assist",
    "value": 1,
    "side": [
      "offense"
    ]
  },
  {
    "name": "rebound",
    "value": 1,
    "rollUp": "rebounds",
    "side": [
      "offense"
    ],
    "context": []
  },
  {
    "name": "turnover",
    "value": 1,
    "side": [
      "offense"
    ],
    "context": []
  },
  {
    "name": "rebound",
    "value": 1,
    "rollUp": "rebounds",
    "side": [
      "defense"
    ],
    "context": []
  },
  {
    "name": "block",
    "value": 1,
    "side": [
      "defense"
    ],
    "context": []
  },
  {
    "name": "steal",
    "value": 1,
    "side": [
      "defense"
    ],
    "context": []
  }
];
const offensiveActions = metrics.filter(action => action.side.includes("offense"));
const defensiveActions = metrics.filter(action => action.side.includes("defense"));

var currentGame = [];

// Functions

class Game {
  constructor(game) {
    this.gameDateTime = Date.now();
    this.location = game.location;
    this.team = game.team;
    this.coach = game.coach;
    this.opponent = game.opponent
    this.plays = [];
  }
}

class Play {
  constructor(event) {
    this.playTime = Date.now();
    this.name = event.name;
    this.value = event.value;
    this.rollUp = event.rollUp;
    this.side = event.side;
    this.period = event.period;
  }
}

function updateStorage() {

}

function readStorage() {

}

function renderHome() {
  // render nav content



  // render main content
  const newGameContainerEl = document.createElement('div');
  newGameContainerEl.classList.add('button-container');
  const newGameBtn = document.createElement('button');
  newGameBtn.innerText = 'New Game';
  newGameContainerEl.appendChild(newGameBtn);
  mainEl.appendChild(newGameContainerEl);

}

function renderNewGameForm() {

}

function newAction(e) {
  const actionData = e.target.dataset;
  const actionObject = {
    name: actionData.name,
    value: actionData.value,
    rollUp: actionData.rollUp,
    side: actionData.side,
    period: periodEl.value
  }

  const newActionEntry = new Play(actionObject);
  currentGame.push(newActionEntry);
  console.log(newActionEntry)

  renderStats();
}

function renderButton(action, parentEl) {
  const newBtn = document.createElement('button');
  newBtn.dataset.name = action.name;
  newBtn.dataset.value = action.value;
  newBtn.dataset.rollUp = action.rollUp;
  newBtn.dataset.side = action.side;
  // newBtn.dataset.context = action.context;
  newBtn.innerText = action.name;
  newBtn.classList.add('action-btn')
  parentEl.appendChild(newBtn);
  return newBtn;
}

function renderPlayInput() {
  // create live-updating stat display
  statDisplayEl.setAttribute('id', 'statDisplay');
  mainEl.appendChild(statDisplayEl);

  // create offensive actions section
  const offensiveActionsSection = document.createElement('section')
  const offensiveActionsEl = document.createElement('div');
  offensiveActionsEl.classList.add('button-container')
  const offensiveActionsHeaderEl = document.createElement('h6');
  offensiveActionsHeaderEl.innerText = 'offense';
  offensiveActionsSection.appendChild(offensiveActionsHeaderEl);
  offensiveActionsSection.appendChild(offensiveActionsEl);
  
  offensiveActions.forEach(action => {
    renderButton(action, offensiveActionsEl).addEventListener("click", newAction);
  });
  
  // rendr offensive section with buttons
  mainEl.appendChild(offensiveActionsSection);

  // create defensive actions section
  const defensiveActionsSection = document.createElement('section');
  const defensiveActionsEl = document.createElement('div');
  defensiveActionsEl.classList.add('button-container')
  const defensiveActionsHeaderEl = document.createElement('h6');
  defensiveActionsHeaderEl.innerText = 'defense';
  defensiveActionsSection.appendChild(defensiveActionsHeaderEl);
  defensiveActionsSection.appendChild(defensiveActionsEl);
  
  defensiveActions.forEach(action => {
    renderButton(action, defensiveActionsEl).addEventListener("click", newAction);
  });
  
  // render defensive section with buttons
  mainEl.appendChild(defensiveActionsSection);
}

function renderStatCard(stat, label) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('stat-card');
  const valueEl = document.createElement('h3');
  const labelEl = document.createElement('p');
  valueEl.innerText = stat;
  labelEl.innerText = label;
  cardEl.appendChild(valueEl);
  cardEl.appendChild(labelEl);

  statDisplayEl.appendChild(cardEl);
}

function renderStats() {
  statDisplayEl.innerHTML = "";
 
  // render points
  const initialPoints = 0
  const pointsActions = currentGame.filter(gameAction => gameAction.rollUp == "points")
  const pointsTotal = pointsActions.reduce(
    (previousPoints, currentPoints) => previousPoints + parseInt(currentPoints.value),
    initialPoints
  );

  renderStatCard(pointsTotal,"points")

  // render rebounds
  const initialRebounds = 0
  const reboundsActions = currentGame.filter(gameAction => gameAction.rollUp == "rebounds")
  const reboundsTotal = reboundsActions.reduce(
    (previous, current) => previous + parseInt(current.value),
    initialRebounds
  );

  renderStatCard(reboundsTotal,"rebounds")

  // render assists
  const nonRollUpActions = metrics.filter((nrAction) => !nrAction.rollUp);
  nonRollUpActions.forEach(nrAction => {
    const currentGameActions = currentGame.filter(cgAction => cgAction.name == nrAction.name)
    const initial = 0
    const statTotal = currentGameActions.reduce(
      (prev, curr) => prev + parseInt(curr.value),
      initial
    )

    renderStatCard(statTotal, nrAction.name)
  })
}

function init() {
  renderPlayInput();
}

init();
// Event Listeners