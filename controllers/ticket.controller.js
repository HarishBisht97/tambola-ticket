const prismaClient = require('../prismaClient')
const { prisma } = prismaClient
const { isInteger } = require('../utils/utils')

const generateTicket = async (req, res, next) => {
	try {
		const setQuantity = req.body.setQuantity
		if (!setQuantity)
			return res.status(400).json({ error: 'setQuantity field is required' })

		if (!isInteger(setQuantity))
			return res
				.status(400)
				.json({ error: 'setQuantity field is should be a number' })

		if (setQuantity < 1)
			return res
				.status(400)
				.json({ error: 'setQuantity cannot be less than 1' })

		const lastSet = await prisma.TambolaTicket.findFirst({
			orderBy: { setNumber: 'desc' },
		})

		const initialSet = lastSet?.setNumber + 1 || 1

		const generateTambolaSet = async () => {
			const tickets = {}
			for (
				let setNumber = initialSet;
				setNumber <= initialSet + setQuantity;
				setNumber++
			) {
				tickets[setNumber] = await generateTambolaTicket()
			}
			return tickets
		}

		const maintainNumberCount = (arr) => {
			const zeroIndices = []

			for (let i = 0; i < 4; i++) {
				const randomIndex = Math.floor(Math.random() * arr.length)
				zeroIndices.push(randomIndex)
				arr[randomIndex] = 0
			}

			return arr
		}

		const generateTambolaTicket = () => {
			const ticket = Array.from({ length: 3 }, () => Array(9).fill(0))
			const numbersUsed = new Set()

			for (let col = 0; col < 9; col++) {
				const ticketColumn = Array.from({ length: 3 }, () => {
					let randomNumber
					do {
						randomNumber = Math.floor(Math.random() * 10) + col * 10
					} while (numbersUsed.has(randomNumber))
					numbersUsed.add(randomNumber)
					return randomNumber
				})

				ticketColumn.sort((a, b) => a - b)

				ticketColumn.forEach((number, row) => {
					ticket[row][col] = number
				})
			}

			return ticket.map((row) => maintainNumberCount(row))
		}

		const tickets = await generateTambolaSet()

		for (const key in tickets) {
			if (Object.hasOwnProperty.call(tickets, key)) {
				const ticket = tickets[key]
				await prisma.TambolaTicket.create({
					data: {
						setNumber: parseInt(key),
						ticketData: JSON.stringify(ticket),
					},
				})
			}
		}

		return res.status(200).json({ tickets })
	} catch (error) {
		return res.status(400).json('error : ' + error?.message)
	}
}

const ticket = async (req, res, next) => {
	try {
		const page = req.query.page || 1
		const pageSize = req.query.pageSize || 10
		const tickets = await prisma.TambolaTicket.findMany({
			skip: parseInt((page - 1) * pageSize),
			take: parseInt(pageSize),
			orderBy: { createdAt: 'desc' },
		})
		return res.status(200).json({ tickets })
	} catch (error) {
		return res.status(400).json('error : ' + error?.message)
	}
}

module.exports = {
	generateTicket,
	ticket,
}
