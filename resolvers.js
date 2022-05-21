import pc from '@prisma/client'
import { AuthenticationError, ForbiddenError } from 'apollo-server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// console.log(process.env.JWT_SECRET);

const prisma = new pc.PrismaClient()
// create resolver
const resolvers = {
    Query: {
        users: async (_, args, { userId }) => {
            console.log(userId);
            if (!userId) throw new ForbiddenError("You must be logged in")
            const users = await prisma.user.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                where: {
                    id: {
                        not: userId
                    }
                }
            })
            return users
        }
    },

    Mutation: {
        sigupUser: async (_, { userNew }) => {
            const user = await prisma.user.findUnique({ where: { email: userNew.email } })
            if (user) throw new AuthenticationError("User is already exist with this email")
            const hashedPassword = await bcrypt.hash(userNew.password, 10)
            const newUser = await prisma.user.create({
                data: {
                    ...userNew,
                    password: hashedPassword
                }
            })
            return newUser
        },
        signinUser: async (_, { userSignin }) => {
            const user = await prisma.user.findUnique({ where: { email: userSignin.email } })
            if (!user) throw new AuthenticationError("User doesn't exist with this email")
            const doMatch = await bcrypt.compare(userSignin.password, user.password)
            if (!doMatch) throw new AuthenticationError("email or password is invalid")
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
            return { token }

        }
    }
}

export default resolvers