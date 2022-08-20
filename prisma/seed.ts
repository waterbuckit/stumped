import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const recurse = (set: string[], prefix: string, n: number, k: number, possibleStrings: string[] = []): string[] => {
  if(k === 0) {
    possibleStrings.push(prefix)
    return possibleStrings 
  }

  for(let i = 0; i < n; ++i){
    let tempPrefix = `${prefix}${set[i]}`
    recurse(set, tempPrefix, n, k - 1, possibleStrings)
  }
  return possibleStrings
}

const allKLengthStrings = (set: string[], k: number) => recurse(set, '', set.length, k) 

const main = async () => {

  const k = process.env.URL_LENGTH 
  const tokens = process.env.POSSIBLE_TOKENS?.split('') 
  console.log('Adding rows for URL length: ', k, ' and tokens: ', tokens)

  if(!tokens){
    throw new Error('Tokens is undefined!')
  }
  if(!k){
    throw new Error('URL lenth is undefined!')
  }

  const strings: string[] = allKLengthStrings(tokens, parseInt(k))
  
  console.log('Processed strings... ', strings.length)

  console.log('Beginning string insertion...')

  const promises = strings.map((string) =>
    prisma.link.create({ data: { urlIndex: string } })
  )

  console.log('Waiting to insert strings...')
  
  return Promise.all(promises)
}

main()
  .then(async () => {
    console.log('Inserted URLs...')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })