const { csvToObjs } = require('./helpers.js');
const fs = require('fs');
const path = require('path');

const matchesCsv = fs.readFileSync(path.join(__dirname, 'WorldCupMatches.csv'), 'utf8');
const matchesArrayObjects = csvToObjs(matchesCsv);

const playersCsv = fs.readFileSync(path.join(__dirname, 'WorldCupPlayers.csv'), 'utf8');
const playersArrayObjects = csvToObjs(playersCsv);


const playersWithEventsAndReds = playersArrayObjects.filter((player) => (player.Event && player.Event !== '' && player.Event.includes('R')));

const countriesMatchesPerYear = []
matchesArrayObjects.forEach((match) => {

  const countryYear = countriesMatchesPerYear.find((c) => {
    c.year === match['Year'] && c.country === match['Home Team Name'] || c.year === match['Year'] && c.country === match['Away Team Name']
  })
  if (countryYear) {
    countryYear.matches.push(match['MatchID'])
  } else {
    countriesMatchesPerYear.push({
      year: match['Year'],
      country: match['Home Team Name'],
      matches: [match['MatchID']],
      reds: 0,
      average: 0
    })
  }
})

countriesMatchesPerYear.forEach((country) => {
  const countryReds = playersWithEventsAndReds.filter((player) => country.matches.includes(player['MatchID']))
  country.reds = countryReds.length
  country.average = country.reds / country.matches.length
})

countriesMatchesPerYear.sort((a, b) => {
  return b.average - a.average
})

const max = countriesMatchesPerYear[0].average

const countriesWithMaxReds = countriesMatchesPerYear.filter((country) => country.average == max)

console.log(countriesWithMaxReds)
