export const removeFirst = (arr) => {
	arr.reverse().pop();
	arr.reverse();
	return arr;
};