document.documentElement.classList.add('game-page');

// document.addEventListener('DOMContentLoaded', async () => {
//   const response = await fetch('/games/new-game', {
//     method: 'POST',
//   });

//   const game = await response.json();

//   await console.log(game);
// });

// async function createGame() {
//   const response = await fetch('/games/new-game', {
//     method: 'POST',
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to retrieve game: ${response.status}`);
//   }

//   return response.json();
// }

// document.addEventListener('DOMContentLoaded', async () => {
//   try {
//     const game = await createGame();

//     const newGame = document.createElement('div');

//     const newContent = document.createTextNode('We have a chess game!');

//     newGame.appendChild(newContent);

//     document.querySelector('main').appendChild(newGame);

//     console.log(game);
//   } catch (error) {
//     console.error(error);
//   }
// });
