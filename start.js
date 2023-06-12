import concurrently from 'concurrently';


concurrently([
  { command: 'npm start --prefix client', name: 'client'},
  { command: 'npm start --prefix server', name: 'server' },
])
