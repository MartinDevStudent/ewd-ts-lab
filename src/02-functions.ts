import { colleagues, friends } from './01-basics'
import {Friend, Colleague, EmailContact } from './myTypes'

function older(f: Friend) {
    f.age += 1
    return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

function allOlder(friends: Friend[]) {
    return friends.map(friend => older(friend))
}

console.log(allOlder(friends))

function mySortColleagues(cs: Colleague[]) {
    return cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
}

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) {
    const result = mySortColleagues(cs)

    return result[cs.length - 1];
}

console.log(highestExtension(colleagues.current));

function addColleague(
    cs : Colleague[],
    name : string,
    department : string, 
    email : string)
{
    const sortedColleagues = mySortColleagues(cs)
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

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max? : number
  ): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
       end = max < 2 ? 1 : max
    }
    const sorted = colleagues.sort(sorter);
    const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0,end)
  }

  // Test invocations
  console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

function findFriends(
    friends : Friend[],
    selector: (friend: Friend) => boolean) {
        return friends.filter(selector).map(x => x.name)
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(friend: Friend, interest: string) {
    friend.interests !== undefined
        ? friend.interests.push(interest)
        : friend.interests = [interest]

    return friend.interests
}

console.log(addInterest(friends[1], 'Politics'))