import {
  User,
  Role,
  ViewLog,
  Organization, SearchLog
} from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
     Organization.sync({alter:isDev || isTest, force:true}),
     Role.sync({alter:isDev || isTest, force:true}),
     User.sync({alter:isDev || isTest, force:true}),
     SearchLog.sync({alter:isDev || isTest, force:true}),
  //   ViewLog.sync({alter:isDev || isTest, force:true}),
  ])

export default dbInit 
