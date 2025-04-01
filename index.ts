import SortedSet from "./src/core/dataStructures/sortedSet";

const sortedSet = new SortedSet<number>();

const numbers = Array.from({ length: 1000 }, (_, i) => i);
numbers.forEach(n => sortedSet.add(n))

for(let i = 0; i < numbers.length; i++){
    console.log(sortedSet.values().next().value);
}
