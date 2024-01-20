import { colleagues, friends } from './01-basics'
import {Friend, Colleague } from './myTypes'

function older(f: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

function allOlder(friends: Friend[]) : string[] {
    return friends.map(friend => older(friend))
}

console.log(allOlder(friends))

function sortColleagues(cs: Colleague[]): Colleague[] {
    return cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
}

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
    const result = sortColleagues(cs)

    return result[cs.length - 1];
}

console.log(highestExtension(colleagues.current));

function addColleague(
    cs : Colleague[],
    name : string,
    department : string, 
    email : string
) : void {
    const sortedColleagues = sortColleagues(cs)
    const newColleague: Colleague = {
        name,
        department,
        contact: {
            email,
            extension: sortedColleagues[cs.length - 1].contact.extension + 1
        }
    }

    sortedColleagues.push(newColleague)
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));