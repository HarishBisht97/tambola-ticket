const isInteger = (str) => {
	const num = parseInt(str, 10)
	return !isNaN(num) && Number.isInteger(num)
}

module.exports = {
	isInteger,
}
