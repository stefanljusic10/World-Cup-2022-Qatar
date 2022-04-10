const main = () =>{
    let groups = {
        'Group A': [
            { name: 'Qatar', rank: 51 },
            { name: 'Ecuador', rank: 46 },
            { name: 'Senegal', rank: 20 },
            { name: 'Netherlands', rank: 10 }
        ],
        'Group B': [
            { name: 'England', rank: 5 },
            { name: 'Iran', rank: 21 },
            { name: 'SAD', rank: 15 },
            { name: 'Ukraine', rank: 27 }
        ],
        'Group C': [
            { name: 'Argentina', rank: 4 },
            { name: 'Saudi Arabia', rank: 49 },
            { name: 'Mexico', rank: 9 },
            { name: 'Poland', rank: 26 }
        ],
        'Group D': [
            { name: 'France', rank: 3 },
            { name: 'Peru', rank: 22 },
            { name: 'Denmark', rank: 11 },
            { name: 'Tunisia', rank: 35 }
        ],
        'Group E': [
            { name: 'Spain', rank: 7 },
            { name: 'New Zealand', rank: 101 },
            { name: 'Germany', rank: 12 },
            { name: 'Japan', rank: 23 }
        ],
        'Group F': [
            { name: 'Belgium', rank: 2 },
            { name: 'Canada', rank: 38 },
            { name: 'Marocco', rank: 24 },
            { name: 'Croatia', rank: 16 }
        ],
        'Group G': [
            { name: 'Brazil', rank: 1 },
            { name: 'Serbia', rank: 25 },
            { name: 'Switzerland', rank: 14 },
            { name: 'Cameron', rank: 37 }
        ],
        'Group H': [
            { name: 'Portugal', rank: 8 },
            { name: 'Ghana', rank: 60 },
            { name: 'Uruguay', rank: 13 },
            { name: 'South Corea', rank: 29 }
        ],
    }
    let groupsMatches
    let groupsStatistics
    let groupsTables
    let knockoutPairs

    // generate goals based on team rank
    const generateGoals = (teamRank) => {
        let maxGoals = 8
        let teamScoringChances
        let goalsScored

        switch (true) {
            case teamRank <= 10: teamScoringChances = 0.8
                break;
            case teamRank > 10 && teamRank <= 20: teamScoringChances = 0.65
                break;
            case teamRank > 20 && teamRank <= 40: teamScoringChances = 0.35
                break;
            case teamRank > 40: teamScoringChances = 0.2
                break;
            default:
                break;
        }

        goalsScored = Math.floor(Math.random() * (maxGoals * teamScoringChances))
        return goalsScored
    }

    // fix spaces for printing in console
    const fixSpace = (str, spaces) => {
        let spacesLeft = spaces - str.length
        return spacesLeft
    }

    // generating match results by groups and sorting them by fixtures
    const groupResults = (allGroups) => {
        let matchesByGroups = {}
        let matchesByFixtures = []

        // fill groups with results
        for (const currentGroup in allGroups) {
            let teamsInGroup = allGroups[currentGroup]
            // create new array for every group an fill with match results
            matchesByGroups[currentGroup] = []
            for (let i = 0; i < teamsInGroup.length - 1; i++) {
                for (let j = i + 1; j < teamsInGroup.length; j++) {
                    let teamOneRank = teamsInGroup[i].rank
                    let teamTwoRank = teamsInGroup[j].rank
                    let matchResult = {
                        teamOne: { ...teamsInGroup[i], goals: generateGoals(teamOneRank) },
                        teamTwo: { ...teamsInGroup[j], goals: generateGoals(teamTwoRank) },
                    }
                    matchesByGroups[currentGroup].push(matchResult)
                }
            }
        }
        
        // sorting matches by fixtures
        for (const currentGroup in matchesByGroups) {
            const match = matchesByGroups[currentGroup]
            const totalMatches = matchesByGroups[currentGroup].length
            matchesByFixtures[currentGroup] = []

            for (let i = 0, j = totalMatches - 1; i < totalMatches / 2; i++, --j) {
                matchesByFixtures[currentGroup].push(match[i])
                matchesByFixtures[currentGroup].push(match[j])
            }
        }

        return matchesByFixtures
    }

    // print match result
    const matchOutput = (matches, matchNumber) => {
        console.log('  ' + matches[matchNumber].teamOne.name + ` ${matches[matchNumber].teamOne.goals}:${matches[matchNumber].teamTwo.goals} ` + matches[matchNumber].teamTwo.name)
        console.log('  ' + matches[matchNumber + 1].teamOne.name + ` ${matches[matchNumber + 1].teamOne.goals}:${matches[matchNumber + 1].teamTwo.goals} ` + matches[matchNumber + 1].teamTwo.name)
    }

    // print matches for each group
    const matchesByFixture = (group, results, matchIndex) => {
        const matches = results[group]
        console.log(' ' + group);
        matchOutput(matches, matchIndex)
    }

    // connecting previous two functions
    const allMatchesByFixture = (results, index) => {
        for (const currentGroup in results) {
            matchesByFixture(currentGroup, results, index)
        }
    }

    // printing match results by fixtures
    const printResultsByGroupsAndFixtures = (groupsResults) => {
        console.log('\nGROUP RESULTS - FIXTURE 1')
        allMatchesByFixture(groupsResults, 0)
        console.log('\nGROUP RESULTS - FIXTURE 2')
        allMatchesByFixture(groupsResults, 2)
        console.log('\nGROUP RESULTS - FIXTURE 3')
        allMatchesByFixture(groupsResults, 4)
    }

    // creating statistics for each team for every match after group phase is finished
    const statisticsByGroups = (matches) => {
        let statsOveral = {}, statsInGroup
        let matchInGroup
        
        for (const currentGroup in matches) {
            matchInGroup = []

            statsInGroup = matches[currentGroup].map(match => {
                // First team wins
                if(match.teamOne.goals > match.teamTwo.goals){
                    matchInGroup.push({
                        name: match.teamOne.name,
                        rank: match.teamOne.rank,
                        win: 1,
                        draw: 0,
                        lose: 0,
                        GF: match.teamOne.goals,
                        GA: match.teamTwo.goals,
                        points: 3
                    })
                    matchInGroup.push({
                        name: match.teamTwo.name,
                        rank: match.teamTwo.rank,
                        win: 0,
                        draw: 0,
                        lose: 1,
                        GF: match.teamTwo.goals,
                        GA: match.teamOne.goals,
                        points: 0
                    })
                }
                // Second team wins
                else if(match.teamOne.goals < match.teamTwo.goals){
                    matchInGroup.push({
                        name: match.teamOne.name,
                        rank: match.teamOne.rank,
                        win: 0,
                        draw: 0,
                        lose: 1,
                        GF: match.teamOne.goals,
                        GA: match.teamTwo.goals,
                        points: 0
                    })
                    matchInGroup.push({
                        name: match.teamTwo.name,
                        rank: match.teamTwo.rank,
                        win: 1,
                        draw: 0,
                        lose: 0,
                        GF: match.teamTwo.goals,
                        GA: match.teamOne.goals,
                        points: 3
                    })
                }
                // Draw
                else{
                    matchInGroup.push({
                        name: match.teamOne.name,
                        rank: match.teamOne.rank,
                        win: 0,
                        draw: 1,
                        lose: 0,
                        GF: match.teamOne.goals,
                        GA: match.teamTwo.goals,
                        points: 1
                    })
                    matchInGroup.push({
                        name: match.teamTwo.name,
                        rank: match.teamTwo.rank,
                        win: 0,
                        draw: 1,
                        lose: 0,
                        GF: match.teamOne.goals,
                        GA: match.teamTwo.goals,
                        points: 1
                    })
                }

                return matchInGroup
            })
            statsOveral[currentGroup] = matchInGroup
        }
        return statsOveral
    }

    // creating tables with full statistics after group phase and sorting teams by required conditions
    const tablesByGroups = (statistics, matches) => {
        const groups = Object.keys(statistics)
        const totalStats = groups.reduce((group, currGroup) => {
            const currentGroup = statistics[currGroup]
            const grouped = currentGroup.reduce((acc, { name, rank, win, draw, lose, points, GF, GA }) => {
                acc[name] ??= { name, rank, win: 0, draw: 0, lose: 0, GF: 0, GA: 0, points: 0 }
                acc[name].win += win
                acc[name].draw += draw
                acc[name].lose += lose
                acc[name].GF += GF
                acc[name].GA += GA
                acc[name].points += points
                return acc
            }, {})
            group[currGroup] = Object.values(grouped)
    
            // sorting teams in each group by required conditions
            group[currGroup].sort((prev, next) => {
                // conditions in variables
                let morePoints = ( prev.points > next.points )
                let equalPoints = ( prev.points === next.points )
                let teamOneGoalDifference = ( prev.GF - prev.GA )
                let teamTwoGoalDifference = ( next.GF - next.GA )
                let biggerGoalDifference = ( teamOneGoalDifference > teamTwoGoalDifference )
                let equalGoalDifference = ( teamOneGoalDifference === teamTwoGoalDifference )
                let moreGoalsFor = ( prev.GF > next.GF )
                let equalGoalsFor = ( prev.GF === next.GF )
    
                if (morePoints){
                    return -1
                }
                else if (equalPoints && biggerGoalDifference){
                    return -1
                }
                else if (equalPoints && equalGoalDifference && moreGoalsFor){
                    return -1
                }
                else if (equalPoints && equalGoalDifference && equalGoalsFor ){
                    let findPair = matches[currGroup].find(match => {
                        if((match.teamOne.name === prev.name || match.teamOne.name === next.name)
                            &&
                            (match.teamTwo.name === prev.name || match.teamTwo.name === next.name)
                        ){
                            return [prev.goals, next.goals]
                        }
                    })
                    if(findPair[0] > findPair[1]){
                        return -1
                    }
                }
                return 0;
            })
            
            return group
        }, {})
        
        return totalStats
    }

    // print table
    const printTable = (group, i) => {
        let team = group[i]
        let teamNameAndRank = team.name + ` (${team.rank})`
        let goalDiff = team.GF + ':' + team.GA
        // print table with fixed spaces for columns
        console.log(`${i+1}. ${teamNameAndRank}` + ' '.repeat(fixSpace(teamNameAndRank, 20)) + `${team.win}  ${team.draw}  ${team.lose}  ${goalDiff}` + ' '.repeat(fixSpace(goalDiff, 6)) + `${team.points}`);
    }

    // print groups with statistics
    const printGroups = (tables) => {
        for (const currentGroup in tables) {
            // print group name
            console.log('\n' + currentGroup);
            for (let i = 0; i < tables[currentGroup].length; i++) {
                // print every team with total statistics
                printTable(tables[currentGroup], i)
            }
        }
    }

    // dividing team in seeded and unseeded group and drawing them for knockout phase
    const sortTeamsForKnockoutDraw = (tables) => {
        let nextPhaseTeams = []
        let drawTeamsSort = { seeded: [], unseeded: [] }

        // removing teams from groups which finished 3rd and 4th
        // adding group position to teams which finished 1st and 2nd
        for (const currentGroup in tables) {
            // create new array with teams which finished 1st and 2nd
            let teamsForKnockoutPhase = tables[currentGroup].slice(0, 2)
            let firstTeamDraw = currentGroup.replace('Group ', '') + '1'
            let secondTeamDraw = currentGroup.replace('Group ', '') + '2'
            let groupName = currentGroup.substr(currentGroup.length - 1)
            let firstTeam = { name: teamsForKnockoutPhase[0].name, rank: teamsForKnockoutPhase[0].rank, position: firstTeamDraw, group: groupName }
            let secondTeam = { name: teamsForKnockoutPhase[1].name, rank: teamsForKnockoutPhase[1].rank, position: secondTeamDraw, group: groupName }
            
            nextPhaseTeams.push({ firstTeam, secondTeam })
        }
        // sorting teams in two groups, seeded and unseeded
        // seeded are teams which finished 1st in group
        // unseeded are teams which finished 2nd in group
        for (let i = 0; i < nextPhaseTeams.length; i++) {
            drawTeamsSort.seeded.push(nextPhaseTeams[i].firstTeam)
            drawTeamsSort.unseeded.push(nextPhaseTeams[i].secondTeam)
        }

        return drawTeamsSort
    }

    // randomly pairing teams from different groups
    const drawTeamsForKnockout = (teams) => {
        let pairedTeams = []
        let unseededRandomTeamIndex
        
        while(teams.seeded.length){
            // pick random team from unseeded group (finished 2nd in group phase)
            unseededRandomTeamIndex = Math.floor(Math.random() * teams.unseeded.length)
            let seededTeamGroup = teams.seeded[0]?.group
            let unseededTeamGroup = teams.unseeded[unseededRandomTeamIndex]?.group
            
            if (seededTeamGroup !== unseededTeamGroup){
                pairedTeams.push([
                    { ...teams.seeded[0], goals: 0 },
                    { ...teams.unseeded[unseededRandomTeamIndex], goals: 0 }
                ])
                // remove team from seeded and unseeded group after pair is picked
                teams.seeded.shift()
                teams.unseeded.splice(unseededRandomTeamIndex, 1)
            }
        }

        return pairedTeams.flat()
    }

    // print round number
    const printKnockoutRound = (pairs) => {
        let roundNumber = pairs.length / 2
        if(roundNumber > 1){
            console.log(`\n1/${roundNumber} finals`);
        }
        else if(roundNumber === 1){
            console.log('\nFinal');
        }
        else if(roundNumber < 1){
            console.log(`\n!!! WINNER !!!\n  ${pairs[0].name}`);
        }
    }

    // print match result
    const printMatchResult = (teamOne, teamTwo) => {
        console.log(`  (${teamOne.position}) ${teamOne.name} ${teamOne.goals} : ${teamTwo.goals} ${teamTwo.name} (${teamTwo.position})`)
    }

    // push team in next round
    const goNextRound = (allPairs, nextRound = [], team) => {
        nextRound.push(team)
        allPairs.splice(0, 2)
    }

    // knockout phase games
    const printKnockoutPhaseResults = (pairs) => {
        let winner = []
        printKnockoutRound(pairs)

        while(pairs.length){
            // first and second element of pairs array are teams playing one agains other i current knockout round
            if(pairs.length === 1) return
            let teamOneRank = pairs[0].rank
            let teamTwoRank = pairs[1].rank
            pairs[0].goals = generateGoals(teamOneRank)
            pairs[1].goals = generateGoals(teamTwoRank)
            let firstTeam = pairs[0]
            let secondTeam = pairs[1]

            if(firstTeam.goals > secondTeam.goals){
                printMatchResult(firstTeam, secondTeam)
                goNextRound(pairs, winner, firstTeam)
            }
            else if(firstTeam.goals < secondTeam.goals){
                printMatchResult(firstTeam, secondTeam)
                goNextRound(pairs, winner, secondTeam)
            }
        }

        return printKnockoutPhaseResults(winner)
    }

    groupsMatches = groupResults(groups)
    groupsStatistics = statisticsByGroups(groupsMatches)
    groupsTables = tablesByGroups(groupsStatistics, groupsMatches)
    knockoutDraw = sortTeamsForKnockoutDraw(groupsTables)
    knockoutPairs = drawTeamsForKnockout(knockoutDraw)
    printResultsByGroupsAndFixtures(groupsMatches)
    printGroups(groupsTables)
    printKnockoutPhaseResults(knockoutPairs)
}

main();