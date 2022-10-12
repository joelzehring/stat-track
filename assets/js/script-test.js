// Variables

var pointCount = 0;
var assistCount = 0;
var reboundCount = 0;
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
    "side": [
      "offense",
      "defense"
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

const buttonContainerEl = document.getElementById('buttonContainer');

// Classes and Functions

class dataPoint {
  constructor(name, value, rollUp, side, context) {
    this.name = name;
    this.value = value;
    this.rollUp = rollUp;
    this.side = side;
    this.context = context;
  }
}

function renderButton(action, parentEl) {
  const newBtn = document.createElement('button');
  newBtn.dataset.name = action.name;
  newBtn.dataset.value = action.value;
  newBtn.dataset.rollUp = action.rollUp;
  newBtn.dataset.side = action.side;
  newBtn.dataset.context = action.context;
  newBtn.innerText = action.name;
  parentEl.appendChild(newBtn);
}

function renderBtnGroups() {
  const offensiveActionsEl = document.createElement('div');
  const offensiveActionsHeaderEl = document.createElement('h6');
  offensiveActionsHeaderEl.innerText = 'offense';
  offensiveActionsEl.appendChild(offensiveActionsHeaderEl);

  offensiveActions.forEach(action => {
    if (action.rollUp) {
      if (true) {
        console.log('creating rollUp div for ' + action.rollUp)
        const rollUpGroup = document.createElement('div');
        rollUpGroup.id = action.rollUp;
        rollUpGroup.style.display = 'flex';
        rollUpGroup.style.alignItems = 'stretch';
        offensiveActionsEl.appendChild(rollUpGroup);
        renderButton(action, rollUpGroup);
      } else {
        renderButton(action, document.getElementById(action.rollUp));
      }

    } else {
      renderButton(action, offensiveActionsEl);
    }

  });

  buttonContainerEl.appendChild(offensiveActionsEl);

  const defensiveActionsEl = document.createElement('div');
  const defensiveActionsHeaderEl = document.createElement('h6');
  defensiveActionsHeaderEl.innerText = 'defense';
  defensiveActionsEl.appendChild(defensiveActionsHeaderEl);

  defensiveActions.forEach(action => {
    renderButton(action, defensiveActionsEl);
  });

  buttonContainerEl.appendChild(defensiveActionsEl);
}

// renderBtnGroups();
// Event Listeners

// document.getElementById('pointAddBtn').onclick = function changeContent() {
//   pointCount++;
//   document.getElementById('pointDsp').textContent = pointCount;
// }

// document.getElementById('pointMinusBtn').onclick = function changeContent() {
//   pointCount--;
//   document.getElementById('pointDsp').textContent = pointCount;
// }

// document.getElementById('assistAddBtn').onclick = function changeContent() {
//   assistCount++;
//   document.getElementById('assistDsp').textContent = assistCount;
// }

// document.getElementById('assistMinusBtn').onclick = function changeContent() {
//   assistCount--;
//   document.getElementById('assistDsp').textContent = assistCount;
// }

// document.getElementById('reboundAddBtn').onclick = function changeContent() {
//   reboundCount++;
//   document.getElementById('reboundDsp').textContent = reboundCount;
// }

// document.getElementById('reboundMinusBtn').onclick = function changeContent() {
//   reboundCount--;
//   document.getElementById('reboundDsp').textContent = reboundCount;
// }