import moment from 'moment';

export const generateMatches = (teams: any[]) => {
  const matches = [];
  const numTeams = teams.length;
  const playedMatches = new Set(); // To track already played matches

  // Generate regular season matches
  for (let round = 0; round < numTeams - 1; round++) {
    for (let match = 0; match < numTeams / 2; match++) {
      let home = (round + match) % (numTeams - 1);
      let away = (numTeams - 1 - match + round) % (numTeams - 1);

      if (match === 0) {
        away = numTeams - 1; // Last team adjustment
      }

      const homeTeam = teams[home];
      const awayTeam = teams[away];

      // Ensure Team A vs Team B is not repeated as Team B vs Team A
      const matchKey = `${awayTeam.value}-${homeTeam.value}`;
      if (!playedMatches.has(matchKey)) {
        matches.push({
          home: homeTeam,
          away: awayTeam,
          type: 'regular',
        });
        playedMatches.add(matchKey);
      }
    }
  }

  // Generate draft elimination matches if applicable
  if (teams.length >= 4) {
    matches.push(
      { type: 'draft_semifinal', name: 'Semifinal 1' },
      { type: 'draft_semifinal', name: 'Semifinal 2' },
      { type: 'draft_final', name: 'Final' }
    );
  }

  return matches;
};

export const suggestMatchDates = (startDate: Date, matches: any[]) => {
  let currentDate = moment(startDate);
  const matchesWithDates = [];
  let saturdayGames = 0;
  let sundayGames = 0;

  matches.forEach((match) => {
    // Ensure each game is on a weekend
    if (saturdayGames < sundayGames) {
      currentDate = currentDate.day(6); // Set to Saturday
      saturdayGames++;
    } else {
      currentDate = currentDate.day(7); // Set to Sunday
      sundayGames++;
    }

    matchesWithDates.push({
      ...match,
      date: currentDate.toDate(),
    });

    // Move to the next weekend
    currentDate.add(1, 'week');
  });

  // Ensure the final match is on a Sunday
  if (matches[matches.length - 1].type === 'draft_final') {
    const finalMatch = matchesWithDates[matchesWithDates.length - 1];
    finalMatch.date = moment(finalMatch.date).day(7).toDate();
  }

  return matchesWithDates;
};

export const calculateEndDate = (matches: any[]) => {
  if (matches.length === 0) return null;
  return moment(matches[matches.length - 1].date).toDate();
};
